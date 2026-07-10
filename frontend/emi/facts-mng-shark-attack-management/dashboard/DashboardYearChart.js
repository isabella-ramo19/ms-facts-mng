import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { MDText } from "i18n-react";
import i18n from "../i18n";

function DashboardYearChart({ dashboard }) {
    const user = useSelector(({ auth }) => auth.user);


    const T = new MDText(i18n.get(user.locale));
    const data = {
        labels: dashboard.attacksByYear.map(item => item.year),
        datasets: [
            {
                label: T.translate("dashboard.attacks"),
                data: dashboard.attacksByYear.map(item => item.count),
                borderColor: "#1976d2",
                backgroundColor: "rgba(25,118,210,0.2)",
                fill: true
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false
    };

    return (
        <Card>

            <CardContent>

                <Typography gutterBottom variant="h6">
                    {T.translate("dashboard.attacks_by_year")}
                </Typography>

                <div style={{ height: 300 }}>
                    <Line
                        data={data}
                        options={options}
                    />
                </div>

            </CardContent>

        </Card>
    );

}

export default DashboardYearChart;