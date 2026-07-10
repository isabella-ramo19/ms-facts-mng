import React from "react";
import {Grid,Card, CardContent, Typography} from "@material-ui/core";
import { useSelector } from "react-redux";
import { MDText } from "i18n-react";
import i18n from "../i18n";


function DashboardCards({ dashboard }) {

    const user = useSelector(({ auth }) => auth.user);

const T = new MDText(i18n.get(user.locale));

    return (

        <Grid container spacing={3}>

            <Grid item xs={12} md={4}>

                <Card elevation={3}>

                    <CardContent className="text-center">

                        <Typography
                            variant="h5"
                            color="primary"
                        >
                            {T.translate("dashboard.total_attacks")}
                        </Typography>

                        <Typography
                            variant="h4"
                        >
                            {dashboard.total}
                        </Typography>

                    </CardContent>

                </Card>

            </Grid>

            <Grid item xs={12} md={4}>

                <Card elevation={3}>
                    <CardContent className="text-center">

                        <Typography
                            variant="h5"
                            color="primary"
                        >
                            {T.translate("dashboard.top_countries")}
                        </Typography>

                        <Typography variant="h4">
                            {dashboard.attacksByCountry.length > 0 ? dashboard.attacksByCountry[0].country : T.translate("dashboard.no_data")}
                        </Typography>

                    </CardContent>
                </Card>

            </Grid>

            <Grid item xs={12} md={4}>

                <Card elevation={3}>
                    <CardContent className="text-center">

                        <Typography
                            variant="h5"
                            color="primary"
                        >
                            {T.translate("dashboard.latest_year")}
                        </Typography>
                        <Typography variant="h4">
                            {dashboard.attacksByYear.length > 0 ? dashboard.attacksByYear[0].year : T.translate("dashboard.no_data")}
                        </Typography>

                    </CardContent>
                </Card>

            </Grid>

        </Grid>

    );

}

export default DashboardCards;