import React from "react";
import moment from "moment";
import TagsInput from "./TagsInput";
import PaperlessComponent from "./PaperlessComponent";
import CorrespondentSelect from "./CorrespondentSelect";
import chrono from "chrono-node";

/*var germanDateRefiner = new chrono.Refiner();
germanDateRefiner.refine = function(text, results, opt) {
    console.log(results);

    // improve german date parsing
    results.forEach(function(result) {
        // are there two dots in the date?
        if (result.text.split(".").length - 1 === 2) {
            // if so, check if day and month need to be flipped
        }*/

/*if (
            !result.start.isCertain("meridiem") &&
            result.start.get("hour") >= 1 &&
            result.start.get("hour") < 4
        ) {
            result.start.assign("meridiem", 1);
            result.start.assign("hour", result.start.get("hour") + 12);
        }*/
/*});
    return results;
};*/

class DocumentDetailForm extends PaperlessComponent {
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            doc: this.props.doc
        };
    }

    // HANDLE DETAIL CHANGE
    handleDetailChange(e) {
        var doc = this.state.doc;
        doc[e.target.name] = e.target.value;

        this.setState({
            doc: doc
        });
    }

    // RENDER
    render() {
        // convert the date to local time
        var created = moment
            .utc(this.state.doc.created)
            .local()
            .format("YYYY-MM-DD[T]HH:mm");

        /*var customChrono = new chrono.Chrono();
        customChrono.refiners.push(guessPMRefiner);

        var dates = customChrono.parseDate(this.state.doc.content);
        console.log(dates);*/

        return (
            <form className="form-detail-info">
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        className="form-control"
                        name="title"
                        placeholder="Title"
                        value={this.state.doc.title}
                        onChange={this.handleDetailChange.bind(this)}
                    />
                </div>

                <div className="form-group">
                    <label>Correspondent</label>
                    <CorrespondentSelect
                        value={this.state.doc.correspondent}
                        onChange={this.handleDetailChange.bind(this)}
                    />
                </div>

                <div className="form-group">
                    <label>Content</label>
                    <textarea
                        className="form-control"
                        rows="6"
                        name="content"
                        placeholder="Content"
                        value={this.state.doc.content}
                        onChange={this.handleDetailChange.bind(this)}
                    />
                </div>

                <div className="form-group">
                    <label>Tags</label>
                    <div className="select-wrapper">
                        <TagsInput tags={this.state.doc.tags} />
                    </div>
                </div>

                <div className="form-group">
                    <label>Date</label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        name="created"
                        placeholder="Tags"
                        value={created}
                        onChange={this.handleDetailChange.bind(this)}
                    />

                    {/*Dates found within the document:
                    <ul>
                        <li>abs</li>
                    </ul>*/}
                </div>
            </form>
        );
    }
}

export default DocumentDetailForm;
