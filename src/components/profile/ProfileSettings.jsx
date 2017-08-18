import React from 'react';
import { Link  } from 'react-router';

export default class ProfileSettings extends React.Component {

    render() {
        return (
          <div id="profileSettingsElements">
            <Link to={`/profile/settings/password`} >
                <div id="profileSettingsUnit">
                    <div id="profileSettingsUnitTitle">Reset Password</div>
                    {/*Click send email button, will need "Are you sure?" button afterward*/}
                    {/*<div id="profileSettingsUnitSummary">Reset your password here </div>*/}
                </div>
            </Link>
            <Link to={`/profile/settings/password`} >
                <div id="profileSettingsUnit">
                    <div id="profileSettingsUnitTitle">Email Updates</div>
                    {/*Click send email button, will need "Are you sure?" button afterward*/}
                    {/*<div id="profileSettingsUnitSummary">Reset your password here </div>*/}
                </div>
            </Link>
          </div>
          );
        }
    }