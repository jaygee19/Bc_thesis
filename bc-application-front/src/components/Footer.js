import React, { Component } from 'react'

class Footer extends Component {
    render() {
        return (
            <div style={{ padding: "40px" }}>
                <div className="footer bg-white">
                    <p className="foot-end font-italic text-muted">&copy; since 2021 </p>
                    <hr className="foot-hr"/>
                </div>
            </div>
        )
    }
}

export default Footer
