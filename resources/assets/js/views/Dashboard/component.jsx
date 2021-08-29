import React from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
// @material-ui/core
import Icon from "@material-ui/core/Icon";
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import Table from "../../components/Table/Table.jsx";
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
    const { classes, stocks, onLoading } = this.props;
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
                <p className={classes.cardCategory}>Stok Rendah</p>
                <h3 className={classes.cardTitle}>
                  {stocks.count || 0}/{stocks.total || 0} <small>Produk</small>
                </h3>
              </CardHeader>
              <CardBody>
                <Table
                  isLoading={onLoading}
                  tableHeaderColor="primary"
                  tableHead={["No.", "Produk", "Jumlah", "Satuan"]}
                  tableData={tableData}
                // pagination={pagination}
                />
              </CardBody>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Link to="/stock-on-hand">Selengkapnya</Link>
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
