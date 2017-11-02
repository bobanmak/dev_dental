import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import Layout from './Layout';

export default class IndexPage extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Layout title="Home">
				<div id="page-index" className="page">

					<div>
						<Link to="/my-account">my acc</Link>
					</div>
					<div>
						<Link to="/page1">Page 1</Link>
					</div>
					<div>
						<Link to="/page2">Page 2</Link>
					</div>

				</div>
			</Layout>);
	}
}
