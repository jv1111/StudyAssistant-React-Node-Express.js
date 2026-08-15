const VerifacationLinkBuilder = (header, message, url, buttonName) => {
  const html = `
    <div>
        <h1>${header}</h1>
        <p>${message}</p>
        <div>
            <a href="${url}">
                <button style="height:2rem; 
                background: linear-gradient(to bottom right, aqua, lightgreen );
                border-radius: 10px;
                color: rgb(0, 0, 0);
                font-size: 12pt;
                cursor: pointer;
                transition: all 0.3s ease-out;"
                onMouseOver="this.style.background='linear-gradient(to bottom right, lightgreen, aqua)'"
                onMouseOut="this.style.background='linear-gradient(to bottom right, aqua, lightgreen)'"
                >${buttonName}</button>
            </a>
        </div>
    </div>    
    `;
  return html;
};

module.exports = {
  VerifacationLinkBuilder,
};
