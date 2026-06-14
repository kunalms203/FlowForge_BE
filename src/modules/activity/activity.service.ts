import * as activityRepo from './activity.repository';

export const getWorkspaceActivities = async (workspaceId: string, page = 1, limit = 50) => {
  const offset = (page - 1) * limit;
  const activities = await activityRepo.findActivitiesByWorkspace(workspaceId, limit, offset);
  return { activities, page, limit };
};

export const getProjectActivities = async (projectId: string, page = 1, limit = 50) => {
  const offset = (page - 1) * limit;
  const activities = await activityRepo.findActivitiesByProject(projectId, limit, offset);
  return { activities, page, limit };
};

export const getTaskActivities = async (taskId: string, page = 1, limit = 50) => {
  const offset = (page - 1) * limit;
  const activities = await activityRepo.findActivitiesByTask(taskId, limit, offset);
  return { activities, page, limit };
};

export const logActivity = async (data: {
  workspaceId: string;
  projectId?: string;
  taskId?: string;
  actorId: string;
  action: string;
  oldValues?: any;
  newValues?: any;
}) => {
  return activityRepo.createActivity(data);
};
