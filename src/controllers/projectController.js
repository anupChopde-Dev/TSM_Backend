import ProjectList from '../models/projectList.js';

export const getProjects = async (req, res) => {
  try {
    const projects = await ProjectList.find()
      .populate('users', 'username')
      .populate('selectedTaskIds', 'taskName priority sp')
      .sort({ createdAt: -1 })
      .lean();
    const projectsWithCount = projects.map(project => ({
      ...project,
      taskCount: project.selectedTaskIds ? project.selectedTaskIds.length : 0
    }));
    res.json({ projects: projectsWithCount });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Failed to fetch projects' });
  }
};

export const getProjectsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }

    const projects = await ProjectList.find({ users: userId })
      .select('projectName startDate endDate users selectedTaskIds createdAt updatedAt')
      .populate('users', 'username email role')
      .populate('selectedTaskIds', 'taskName priority sp')
      .sort({ createdAt: -1 })
      .lean();

    const responseProjects = projects.map(project => ({
      id: project._id,
      projectName: project.projectName,
      startDate: project.startDate,
      endDate: project.endDate,
      users: project.users,
      taskCount: project.selectedTaskIds ? project.selectedTaskIds.length : 0,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    }));

    res.json({ projects: responseProjects });
  } catch (error) {
    console.error('Error fetching projects for user:', error);
    res.status(500).json({ message: 'Failed to fetch projects for user' });
  }
};

export const getProjectOptionsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }

    const projects = await ProjectList.find({ users: userId })
      .select('projectName')
      .sort({ createdAt: -1 })
      .lean();

    const projectOptions = projects.map(project => ({
      id: project._id,
      projectName: project.projectName,
      projectDue: `${project.startDate}-${project.endDate}`,
    }));

    res.json({ projects: projectOptions });
  } catch (error) {
    console.error('Error fetching project options for user:', error);
    res.status(500).json({ message: 'Failed to fetch project options for user' });
  }
};

export const createProject = async (req, res) => {
  try {
    const { projectName, startDate, endDate, users, selectedTaskIds } = req.body;

    if (!projectName || !startDate || !endDate || !Array.isArray(users) || !Array.isArray(selectedTaskIds)) {
      return res.status(400).json({
        message: 'projectName, startDate, endDate, users, and selectedTaskIds are required',
      });
    }

    const project = await ProjectList.create({
      projectName,
      startDate,
      endDate,
      users,
      selectedTaskIds,
    });

    res.status(201).json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Failed to create project' });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await ProjectList.findById(req.params.id)
      .populate('users', 'username email role')
      .populate('selectedTaskIds', 'taskName priority sp')
      .lean();

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ message: 'Failed to fetch project' });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { projectName, startDate, endDate, users, selectedTaskIds } = req.body;

    const project = await ProjectList.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (projectName !== undefined) project.projectName = projectName;
    if (startDate !== undefined) project.startDate = startDate;
    if (endDate !== undefined) project.endDate = endDate;
    if (users !== undefined) project.users = Array.isArray(users) ? users : project.users;
    if (selectedTaskIds !== undefined) project.selectedTaskIds = Array.isArray(selectedTaskIds) ? selectedTaskIds : project.selectedTaskIds;

    await project.save();

    res.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ message: 'Failed to update project' });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await ProjectList.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ message: 'Project deleted' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Failed to delete project' });
  }
};
