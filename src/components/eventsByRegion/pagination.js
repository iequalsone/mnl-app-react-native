import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  Icon
} from "native-base";

import styles from "./styles";

class Pagination extends Component {
  constructor() {
    super();

    this.handleNextPress = this.handleNextPress.bind(this);
    this.handlePrevPress = this.handlePrevPress.bind(this);
  }

  handleNextPress(page) {
    this.props.onNextPress(page);
  }

  handlePrevPress(page) {
    this.props.onNextPress(page);
  }

  renderContent() {
    let prevBtn, nextBtn;

    if (this.props.prevPage) {
      prevBtn = <Button transparent iconLeft onPress={() => this.handlePrevPress(this.props.prevPage)}><Icon name="arrow-back" /><Text>Back</Text></Button>;
    } else {
      prevBtn = <Button disabled transparent iconLeft><Icon style={styles.listNavDisabled} name="arrow-back" /><Text style={styles.listNavDisabled}>Back</Text></Button>;
    }

    if (this.props.nextPage) {
      nextBtn = <Button transparent iconRight onPress={() => this.handleNextPress(this.props.nextPage)}><Text>Next</Text><Icon name="arrow-forward" /></Button>;
    } else {
      nextBtn = <Button disabled transparent iconRight><Text style={styles.listNavDisabled}>Next</Text><Icon style={styles.listNavDisabled} name="arrow-forward" /></Button>;
    }

    return <View style={styles.listNavWrap}>{prevBtn}{nextBtn}</View>;
  }

  render() {
    // console.log(this.props);
    return (
      <View>
        {this.renderContent()}
      </View>
    );

    // return (
    //   <div className="row event-pagination">
    //     <div className="col-xs-6">
    //       <p className="text-right">
    //         {this.renderPrevLink(currentPage, totalPages)}
    //       </p>
    //     </div>
    //     <div className="col-xs-6">
    //       <p className="text-left">
    //         {this.renderNextLink(currentPage, totalPages)}
    //       </p>
    //     </div>
    //   </div>
    // );
  }
}

export default Pagination;
