import Button from "@mui/material/Button";
import NavLinkAdapter from "@kyros/core/NavLinkAdapter";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import KyrosLoading from "@kyros/core/KyrosLoading";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import KyrosSvgIcon from "@kyros/core/KyrosSvgIcon";
import withReducer from "app/store/withReducer";
import reducer from "../store";
import _ from "@lodash";
import { getMyProfile, selectMyProfile } from "../store/myProfileSlice";
import {
  getSalesRegions,
  selectSalesRegions,
} from "../store/salesRegionsSlice";
import "tailwindcss/tailwind.css";
import { selectReportingTo } from "../store/reportingToSlice";
import { selectRole } from "../store/roleSlice";
import { selectDateFormat } from "../store/dateFormatSlice";
import HelpIcon from "@mui/icons-material/Help";

const ProfileView = () => {
  const routeParams = useParams();
  const dispatch = useDispatch();
  const myProfile = useSelector(selectMyProfile);
  const { userId } = routeParams;

  useEffect(() => {
    dispatch(getMyProfile(2));
  }, [dispatch, routeParams]);

  return (
    <>
      <div className="ml-10 mt-20">
        <h1 className="text-2xl  font-bold">
          My Profile <HelpIcon fontSize="small" color="disabled" />
        </h1>
        <h1 className="text-md" style={{ color: "gray" }}>
          Manage Your Personal Profile
        </h1>
        <hr className="border-t-2 border-black-400 " />
        <div className="pt-20 flex text-2xl font-bold ">
          <div className="min-w-[80%]">Personal Details.</div>
          <div className="min-w-[10%] text-center"> </div>
          <Button
            variant="contained"
            color="secondary"
            component={NavLinkAdapter}
            to="userId/edit"
          >
            <span>Edit</span>

          </Button>
        </div>
        <div className="min-w-full">

          <hr className="border-t-2 border-gray-400 my-5" />
          <div className="text-darktext  ">
            <div className="text-md font-medium pt-20 flex">
              <div className="min-w-[30%]"> First Name </div>
              <div className="min-w-[10%]"> </div> {myProfile?.firstName}
            </div>
            <div className="text-md font-medium flex pt-20">
              <div className="min-w-[30%]">Last Name</div>
              <div className="min-w-[10%]"> </div> {myProfile?.lastName}
            </div>
            <div className="text-md font-medium flex pt-20">
              <div className="min-w-[30%]">Date of Birth </div>
              <div className="min-w-[10%]"> </div> {myProfile?.dateOfBirth}
            </div>
            <div className="text-md font-medium flex pt-20">
              <div className="min-w-[30%]">Email Address </div>
              <div className="min-w-[10%]"> </div> {myProfile?.emailAddress}
            </div>
            <div className="text-md font-medium flex pt-20">
              <div className="min-w-[30%]">Role</div>
              <div className="min-w-[10%]"> </div> {myProfile?.role?.roleName}
            </div>
            <div className="text-md font-medium flex pt-20">
              <div className="min-w-[30%]">Reporting To </div>
              <div className="min-w-[10%]"> </div>
              {myProfile?.reportingTo?.firstName}
            </div>
            <div className="text-md font-medium flex pt-20">
              <div className="min-w-[30%]">Designation </div>
              <div className="min-w-[10%]"> </div> {myProfile?.designation}
            </div>
            <div className="text-md font-medium flex pt-20">
              <div className="min-w-[30%]">Old Team </div>
              <div className="min-w-[10%]"> </div> {myProfile?.oldTeam}
            </div>
            <div className="text-md font-medium flex pt-20">
              <div className="min-w-[30%]">Department </div>
              <div className="min-w-[10%]"> </div>
              {myProfile?.department}
            </div>
            <div className="text-md font-medium flex pt-20">
              <div className="min-w-[30%]">Sales Regions</div>
              <div className="min-w-[10%]"> </div>
              {myProfile?.salesRegions?.districtName}
            </div>
            <div className="text-md font-medium flex pt-20">
              <div className="min-w-[30%]">Skills </div>
              <div className="min-w-[10%]"> </div> {myProfile?.skills}
            </div>
            <div className="text-md font-medium flex pt-20">
              <div className="min-w-[30%]">Agent Phone Numbers </div>
              <div className="min-w-[10%]"> </div>
              {myProfile?.agentPhoneNumbers}
            </div>
            <div className="text-md font-medium flex pt-20">
              <div className="min-w-[30%]">Phone (Main) </div>
              <div className="min-w-[10%]"> </div> {myProfile?.phoneMain}
            </div>
            <div className="text-md font-medium flex pt-20">
              <div className="min-w-[30%]">Phone (Mobile) </div>
              <div className="min-w-[10%]"> </div> {myProfile?.phoneMobile}
            </div>
            <div className="text-md font-medium flex pt-20">
              <div className="min-w-[30%]">Phone (Others) </div>
              <div className="min-w-[10%]"> </div> {myProfile?.phoneOthers}
            </div>
            <div className="text-md font-medium flex pt-20">
              <div className="min-w-[30%]">Date Format </div>
              <div className="min-w-[10%]"> </div>
              {myProfile?.dateFormat?.dateFormatType}
            </div>
            <div className="text-md font-medium flex pt-20">
              <div className="min-w-[30%]">Time Zone </div>
              <div className="min-w-[10%]"> </div> {myProfile?.timeZone}
            </div>
          </div>
        </div>
        <div className="min-w-full">
          <br />
          <h1 className="text-2xl font-bold ">Work Details.</h1>
          <hr className="border-t-2 border-gray-400 my-5" />
          <div className="text-darktext ">
            <div className="text-md font-medium flex pt-20">
              <div className="min-w-[30%]"> Team </div>
              <div className="min-w-[10%]"> </div> {myProfile?.team?.teamName}
            </div>
            <div className="text-md font-medium  flex pt-20">
              <div className="min-w-[30%]">Is Employee</div>
              <div className="min-w-[10%]"></div> {myProfile?.employee}
            </div>
            <div className="text-md font-medium flex pt-20">
              <div className="min-w-[30%]">Employee Id</div>
              <div className="min-w-[10%]"></div> {myProfile?.employeeId}
            </div>
            <div className="text-md font-medium flex pt-20">
              <div className="min-w-[30%]">Date Of Joining</div>
              <div className="min-w-[10%]"></div>
              {myProfile?.dateOfJoining}
            </div>
            <div className="text-md font-medium flex pt-20">
              <div className="min-w-[30%]">Date Of Resignation</div>
              <div className="min-w-[10%]"></div>
              {myProfile?.dateOfResignation}
            </div>
          </div>
        </div>
        <div className="min-w-full">
          <h1 className="text-2xl pt-20 font-bold">Location Details.</h1>
          <hr className="border-t-2 border-gray-400 my-5" />
          <div className="text-darktext">
            <div className="text-md font-medium flex pt-20">
              <div className="min-w-[30%]">Location Name</div>
              <div className="min-w-[10%]"> </div>
              {myProfile?.locationName}
            </div>
            <div className="text-md font-medium flex pt-20">
              <div className="min-w-[30%]">Address</div>
              <div className="min-w-[10%]"></div>
              {myProfile?.address}
            </div>
            <div className="text-md font-medium flex pt-20">
              <div className="min-w-[30%]">City</div>
              <div className="min-w-[10%]"></div>
              {myProfile?.city}
            </div>
            <div className="text-md font-medium flex pt-20">
              <div className="min-w-[30%]">State</div>
              <div className="min-w-[10%]"></div>
              {myProfile?.state}
            </div>
            <div className="text-md font-medium flex pt-20">
              <div className="min-w-[30%]">Country</div>
              <div className="min-w-[10%]"></div>
              {myProfile?.country?.countryName}
            </div>
            <div className="text-md font-medium flex pt-20">
              <div className="min-w-[30%]">Zip Code</div>
              <div className="min-w-[10%]"></div>
              {myProfile?.zipCode}
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default withReducer("profileApp", reducer)(ProfileView);
