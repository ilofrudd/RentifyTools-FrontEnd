import { Global, css } from '@emotion/react'

function GlobalStyles() {
  const globalAppStyles = css`
    * {
      box-sizing: border-box;
    }

    body,
    html {
      margin: 0;
      height: 100%;
      font-family: 'Inter', sans-serif;
    }

    #root {
      display: flex;
      min-height: 100%;
      flex-direction: column;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    li {
      margin: 0;
      padding: 0;
    }
  `

  return <Global styles={globalAppStyles} />
}

export default GlobalStyles
