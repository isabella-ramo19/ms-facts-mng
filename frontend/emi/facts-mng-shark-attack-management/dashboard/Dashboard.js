import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import withReducer from "app/store/withReducer";
import reducer from "../store/reducers";
import DashboardHeader from "./DashboardHeader";
import { FusePageCarded } from "@fuse";
import DashboardCards from "./DashboardCards";
import DashboardCountryChart from "./DashboardCountryChart";
import { getDashboardStats } from "../store/actions/Dashboard.actions";
import DashboardYearChart from "./DashboardYearChart";

function Dashboard(props) {
    useEffect(() => {
        props.getDashboardStats();
    }, []);
    return (
        <FusePageCarded
            classes={{
                content: "flex flex-col p-24"
            }}
            header={
                <DashboardHeader />
            }
            content={
                <div>

                    <DashboardCards
                        dashboard={props.dashboard}
                    />
                    <div style={{ marginTop: 24 }}>
                        <DashboardCountryChart dashboard={props.dashboard} />
                    </div>

                    <div style={{ marginTop: 24 }}>
                        <DashboardYearChart dashboard={props.dashboard} />
                    </div>
                </div>
            }
        />
    );

}

const mapStateToProps = (state) => {

    return {
        dashboard:
            state &&
                state.SharkAttackManagement
                ? state.SharkAttackManagement.dashboard
                : {
                    total: 0,
                    attacksByCountry: [],
                    attacksByYear: []
                }
    };
};

const mapDispatchToProps = {
    getDashboardStats
};

export default withReducer(
    "SharkAttackManagement",
    reducer
)(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Dashboard)
);