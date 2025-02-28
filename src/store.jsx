import { legacy_createStore, combineReducers, applyMiddleware } from "redux";

import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { ShowAlertReducer } from "./Reducer/alertReducer.jsx";
import {
  CreateUserReducer,
  MeDetailsReducer,
  LogoutReducer,
  GetAllAdminReducer,
  GetPost_BiddingDocumentReducer,
  GetTenentResponseReducer,
  TenentResponseIsExitReducer,
  getAllUserReducer,
  
  paymentReducer,
  getPaidPropertyReducer,

  getTransactionDetailReducer
} from "./Reducer/userReducer.jsx";

import {
  CreatePostReducer,
  GetAllPostReducer,
  GetPostReducer,
  GetSinglePostReducer,
  GetProjectNameReducer,
  Admin_OwnerGetAllPostReducer,
  GetSingleProjectNameDataReducer,
  Admin_OwnerGetAllScheduleVisitsReducer,
  GetAllAssignPropertyReducer,
  GetAdminAgentAssignPropertyReducer,
  GetAllScheduleVisitsAndMakeOffer_LengthReducer,
  GetMyVisitsReducer,
  GetSimilarProperty,
  OwnerAllPostsVisitsReducer,
  // OwnerAllPostsVisitsReducer,
  GetAllNotificationsAndRequirementsReducer,
  OwnerAllExcelFileReducer,
  fetchAllOwnerFilesReducer,

  GetDeletedPostsReducer,
  fetchAllAdminFilesReducer,
  fetchAllAgentFilesReducer,
  removeExcelFromAdminReducer,
} from "./Reducer/postReducer.jsx";

const reducer = combineReducers({
  Alert: ShowAlertReducer,
  userData: CreateUserReducer,
  meDetails: MeDetailsReducer,
  LogoutUser: LogoutReducer,
  Post: CreatePostReducer,
  GetPost: GetPostReducer,
  GetAllPost: GetAllPostReducer,
  GetSinglePost: GetSinglePostReducer,
  ProjectName: GetProjectNameReducer,
  AdminData: GetAllAdminReducer,
  AdminGetAllPost: Admin_OwnerGetAllPostReducer,
  OfferRecived: GetPost_BiddingDocumentReducer,
  TenentResponse: GetTenentResponseReducer,
  SingleProjectName: GetSingleProjectNameDataReducer,
  ScheduleVisits: Admin_OwnerGetAllScheduleVisitsReducer,
  AssignPropertys: GetAllAssignPropertyReducer,
  AdminProperty: GetAdminAgentAssignPropertyReducer,
  VistAndOffer: GetAllScheduleVisitsAndMakeOffer_LengthReducer,
  MyVisits: GetMyVisitsReducer,
  SimilarProperty: GetSimilarProperty,
  OwnerPostsVisits: OwnerAllPostsVisitsReducer,
  TenentResponseIsExit: TenentResponseIsExitReducer,
  AllUserResponse: getAllUserReducer,
  AllNotifiesAndReq: GetAllNotificationsAndRequirementsReducer,
  deletePosts: GetDeletedPostsReducer,

  AllUserResponse:getAllUserReducer,
  
  AllNotifiesAndReq:GetAllNotificationsAndRequirementsReducer,
  paymentResponse:paymentReducer,
  
  paidPropertyData:getPaidPropertyReducer,
  OwnerUploadingExcelFile:OwnerAllExcelFileReducer,
  OwnerAllExcelFiles:fetchAllOwnerFilesReducer,
  AdminAllExcelFiles:fetchAllAdminFilesReducer,
  AgentAllExcelFiles:fetchAllAgentFilesReducer,
  // RemoveAdminAgentExcel:removeExcelFromAdminReducer

  getTransactionDetail:getTransactionDetailReducer
});

let initialState = {};

const middleware = [thunk];
const store = legacy_createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
