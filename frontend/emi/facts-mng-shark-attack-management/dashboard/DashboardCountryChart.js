import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { MDText } from "i18n-react";
import i18n from "../i18n";

function DashboardCountryChart({ dashboard }) {
    const user = useSelector(({ auth }) => auth.user);

    const T = new MDText(i18n.get(user.locale));
        const data = {
            labels: dashboard.attacksByCountry.map(c => c.country),
            datasets: [
                {
                    label: T.translate("dashboard.attacks"),
                    data: dashboard.attacksByCountry.map(c => c.count),
                    backgroundColor: "#1976d2"
                }
            ]
        };  

        const options = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: false
        }
    };

    return (
        <Card>

            <CardContent>

                <Typography gutterBottom variant="h6">
                    {T.translate("dashboard.top_countries")}

                </Typography>

                <div style={{ height: 300 }}>
                    <Bar
                        data={data}
                        options={options}
                    />
                </div>

            </CardContent>

        </Card>
    );

}

export default DashboardCountryChart;