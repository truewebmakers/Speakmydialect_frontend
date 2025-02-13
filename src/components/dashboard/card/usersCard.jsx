import { CapitalizeFirstLetter } from "@/utils/helper";
import { Tooltip } from "react-tooltip";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import UseApi from "@/hook/useApi";
import { useSelector } from "react-redux";
import { apiMethods, apiUrls } from "@/constants/constant";
import { toast } from "react-toastify";


 
export default function UsersCard({ data, userType, profileLocked, onProfileLockChange }) {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [LockProfile, setLockProfile] = useState(profileLocked);
  console.log("profileLocked",data.fname + '= '+profileLocked)
 
  const handleEditProfile = (id) => {
    navigate(`/my-profile?superaccess=true&id=${id}&type=${userType}`);
  };

  const handleLockProfile = async (id, type) => {
    const bodyData = {
      profile_lock: type,
    };
    try {
      const headers = { Authorization: `Bearer ${user?.token}` };
      const response = await UseApi(
        apiUrls.UpdateLockUnlockStatus + id,
        apiMethods.POST,
        bodyData,
        headers
      );
      if (response?.status === 200 || response?.status === 201) {
       // setLockProfile(type); // Update the state for this specific record
        toast.success('Status Changed');
        
        // Call the parent callback to notify the status change
        if (onProfileLockChange) {
          onProfileLockChange(id, type); // Pass the updated profile lock status to the parent
        }
      }
    } catch (error) {
      toast.error('Error fetching countries');
    }
  };

  return (
    <tr>
      <th scope="row">
        <div>
          {data?.fname
            ? CapitalizeFirstLetter(data?.fname) + ' ' + CapitalizeFirstLetter(data?.lname)
            : '-'}{' '}
        </div>
      </th>
      <td className="vam">{data?.email ? data?.email : '-'}</td>
      <td className="vam">
        {data?.status ? (
          <span
            className={`pending-style ${data?.status === 'active' ? 'style7' : ''}${data?.status === 'hold' ? 'style1' : ''} ${data.status === 'in-review' ? 'style1' : ''} ${data.status === 'inactive' ? 'style3' : ''} ${data?.status === 'reject' ? 'style2' : ''}`}
          >
            {CapitalizeFirstLetter(data?.status)}
          </span>
        ) : (
          '-'
        )}
      </td>
      <td className="vam">{data?.created_at ? moment(data?.created_at).format('lll') : '-'}</td>
      <td className="vam">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {(profileLocked == 'Yes') ? (
            <button
              onClick={() => handleLockProfile(data?.id, 'No')}
              className="btn btn-warning btn-sm button-lock"
              id="lock"
            >
              <Tooltip anchorSelect="#lock" className="ui-tooltip">
                Click to unlock
              </Tooltip>
              <i className="fa fa-lock"></i>
            </button>
          ) : (
            <button
              id="unlock"
              onClick={() => handleLockProfile(data?.id, 'Yes')}
              className="btn btn-warning btn-sm button-lock"
            >
              <Tooltip anchorSelect="#unlock" className="ui-tooltip">
                Click To lock
              </Tooltip>
              <i className="fas fa-lock-open"></i>
            </button>
          )}
          <a
            className="icon me-2"
            id="edit"
            onClick={() => handleEditProfile(data?.id)}
          >
            <Tooltip anchorSelect="#edit" className="ui-tooltip">
              Edit
            </Tooltip>
            <span className="flaticon-pencil" />
          </a>
        </div>
      </td>
    </tr>
  );
}

