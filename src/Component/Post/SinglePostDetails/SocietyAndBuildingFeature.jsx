import React from 'react'

const SocietyAndBuildingFeature = ({ feature }) => {
    // console.log("feature  ",feature)
    const featur=["Pipeline","Parking","motor","goodies","Pipeline","Parking","motor","goodies","asdasd","asasasde","werjhwbiuw","opodpee","nsdijfweifw"]
    return (
        <div className="society-feature-parent">
            <h2 className="furnish-heading">Property Features</h2>
            {/* <div className='furnish-dummy-line'></div> */}
            <div className='society-feature-container'>
                {
                    feature?.map((item, index) => {
                        return <p className='society-feature'>
                            {item}
                        </p>
                    })
                }
            </div>

        </div>
    )
}

export default SocietyAndBuildingFeature
