import { Suspense } from "react";
import { Spin } from "antd";

const ClassesIndex = lazy(() => import("@/pages/Manager/Classes/index.jsx"));
const CourseIndex = lazy(() => import("@/pages/Manager/Course/index.jsx"));
const StudentIndex = lazy(() => import("@/pages/Manager/Student/index.jsx"));
const TrainingIndex = lazy(() => import("@/pages/Manager/Training/index.jsx"));
const ActivityIndex = lazy(() => import("@/pages/Manager/Activity/index.jsx"));
const EmploymentIndex = lazy(
  () => import("@/pages/Manager/Employment/index.jsx"),
);
const RecordedCurriculumIndex = lazy(
  () => import("@/pages/Manager/RecordedCurriculum/index.jsx"),
);

const asyncComponents = (comp) => {
  return <Suspense fallback={<Spin fullscreen />}>{comp}</Suspense>;
};
const managerRoutes = [
  {
    name: "班级管理",
    path: "manager/classes",
    element: asyncComponents(<ClassesIndex />),
  },
  {
    name: "课程管理",
    path: "manager/course",
    element: asyncComponents(<CourseIndex />),
  },
  {
    name: "学生管理",
    path: "manager/student",
    element: asyncComponents(<StudentIndex />),
  },
  {
    name: "实训管理",
    path: "manager/training",
    element: asyncComponents(<TrainingIndex />),
  },
  {
    name: "活动管理",
    path: "manager/activity",
    element: asyncComponents(<ActivityIndex />),
  },
  {
    name: "实习/就业管理",
    path: "manager/employment",
    element: asyncComponents(<EmploymentIndex />),
  },
  {
    name: "录播课管理",
    path: "manager/recordedCurriculum",
    element: asyncComponents(<RecordedCurriculumIndex />),
  },
];

export default managerRoutes;
