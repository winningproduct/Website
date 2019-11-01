import React from "react"
import { Link, ModalRoutingContext } from 'gatsby-plugin-modal-routing'
import HocAux from "./hocAux"

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
        <HocAux { ...rest }>
          {children}
        </HocAux>
      )
    )}
  </ModalRoutingContext.Consumer>
)

export default ModalLayout