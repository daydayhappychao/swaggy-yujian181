import setService from '@/common/setService';

export const actionGetCourses = setService('get', '/api/courses');
export const actionCreateCourses = setService('post', '/api/courses');
export const actionDelCourses = (id: number) => setService('post', '/api/courses/' + id);


export const actionGetVideos = setService('get','/api/videos');
export const actionCreateVideoss = setService('post', '/api/videos');
export const actionDelVideosss = (id: number) => setService('post', '/api/videos/' + id);