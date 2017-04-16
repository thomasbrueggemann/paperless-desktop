import React from "react";

class Reminders extends React.Component {
    // COMPONENT DID MOUNT
    componentDidMount() {
        $(window).trigger("tabs.replace", {
            idx: 0,
            tab: {
                title: "Reminders",
                route: "/reminders"
            }
        });
        $(window).trigger("header.activeItem", { item: "reminders" });
    }

    // RENDER
    render() {
        return (
            <div>
                Reminders
            </div>
        );
    }
}

export default Reminders;
