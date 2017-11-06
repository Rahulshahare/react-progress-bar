# Change log

### 3.0.0
- Make react, react-bootstrap peer dependencies
- Fix duration animation
- Update build system to use latest babel, browserify
- Use Enzyme v3
- Use Node 6 for local development
- Use react 15 for local development (but still support 0.14 as a peer dependency)
- Remove make-up and use standardjs for linting

### 2.1.1
- Update react-bootstrap to 0.31.2

### 2.1.1
- Require only the parts that are needed from react-bootstrap.

### 2.1.0
- Add a new optional prop for the progress bar's start point before animation.
- Replace react-shallow-render with enzyme in tests
- Upgrade other dev dependencies
- Add nvmrc for node 4.4.4 (project is still compatible with 0.12.9)

### 2.0.3
- Re-publish 2.0.1 without missing files

### 2.0.1
- Bump react-bootstrap
- Publish to npm

### 2.0.0
- Updated react version.

### 1.1.3
- Checking the component is still mounted before changing state.

### 1.1.2
- Clear setTimeout when the component unmounts.

### 1.1.1
- Moved babel out of dev dependencies into dependencies to fix npm post install issue.

### 1.1.0
- Moved to using CSS transition duration to load the bar
- Changed to using duration & now props

### 1.0.1
- Added in ability to pass children to the panel

### 1.0.0
- Initial release
