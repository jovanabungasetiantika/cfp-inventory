import React from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import Table from "../../components/Table/Table.jsx";
import Tasks from "../../components/Tasks/Tasks.jsx";
import CustomTabs from "../../components/CustomTabs/CustomTabs.jsx";
import Danger from "../../components/Typography/Danger.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardIcon from "../../components/Card/CardIcon.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.getList()
  }

  getList = async () => {
    const { fetchIndex } = this.props
    try {
      await fetchIndex()
    } catch (e) {
    }
  }

  renderTableData = items => {
    const { classes } = this.props;

    let tableData = []

    let idx = 1
    tableData.push(..._.map(items, (row, key) => {
      return [
        idx++,
        row.name,
        row.qty,
        row.unit,
      ]
    }))

    return {
      tableData,
    }
  }

  render() {
    const { classes, stocks } = this.props;
    const { tableData } = this.renderTableData(stocks.data)

    return (
      <div>
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>content_copy</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Low Stock</p>
                <h3 className={classes.cardTitle}>
                  {stocks.count || 0}/{stocks.total || 0} <small>Item(s)</small>
                </h3>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="primary"
                  tableHead={["No.", "Item Name", "Qty", "Unit"]}
                  tableData={tableData}
                // pagination={pagination}
                />
              </CardBody>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Link to="/stock-on-hand">See More</Link>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Dashboard;
