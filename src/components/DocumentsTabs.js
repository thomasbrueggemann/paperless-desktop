import React, { useContext, useEffect } from "react";
import { Section } from "bloomer";

export default function DocumentsTabs() {
	return (
		<Section id="tabs">
			<div className="tabs is-boxed">
				<ul>
					<li className="is-active">
						<a>
							<span className="icon is-small">
								<i className="fas fa-image" aria-hidden="true" />
							</span>
							<span>Documents</span>
						</a>
					</li>
					<li>
						<a>
							<span className="icon is-small">
								<i className="fas fa-music" aria-hidden="true" />
							</span>
							<span>Document 123</span>
						</a>
					</li>
				</ul>
			</div>
		</Section>
	);
}
