import React from "react";
import { Typography,Icon } from "@material-ui/core";
import { FuseAnimate } from '@fuse';
import { useSelector } from "react-redux";
import { MDText } from "i18n-react";
import i18n from "../i18n";


function DashboardHeader() {

    const user = useSelector(({ auth }) => auth.user);

    const T = new MDText(i18n.get(user.locale));
    return (
        <div className="flex flex-1 items-center">

            <FuseAnimate animation="transition.expandIn" delay={300}>
                <Icon className="text-32 mr-12">
                    dashboard
                </Icon>
            </FuseAnimate>
            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                <Typography variant="h6">
                    {T.translate("dashboard.title")}
                </Typography>
            </FuseAnimate>
        </div>
    );
}

export default DashboardHeader;