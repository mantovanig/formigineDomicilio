import { Component, Fragment } from "preact";
import { Link } from "preact-router";
import _isEmpty from "lodash.isempty";
import _get from "lodash.get";
import { ChevronLeft as IconChevronLeft } from "preact-feather";

import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export default class Store extends Component {
   render() {
      return (
         <Fragment>
            <Header />
            <Footer />
         </Fragment>
      );
   }
}
