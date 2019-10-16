import React from "react"
import { Link, ModalRoutingContext } from 'gatsby-plugin-modal-routing'
import hocAux from "./hocAux"

const ModalLayout = ({ children, ...rest }) => (
  <ModalRoutingContext.Consumer>
    {({ modal, closeTo }) => (
      modal ? (
        <React.Fragment>
          <Link to={closeTo}>
            Close
          </Link>
          {children}
        </React.Fragment>
      ) : (
        <hocAux { ...rest }>
          {children}
        </hocAux>
      )
    )}
  </ModalRoutingContext.Consumer>
)

export default ModalLayout