import facepaint from "facepaint"

const breakpoints = [640, 1024, 1200, 1440]
const bp = facepaint(breakpoints.map(bp => `@media (min-width: ${bp}px)`))

export default bp
