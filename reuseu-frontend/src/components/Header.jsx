import "./Header.css";

function Header() {
    return (
        <header className="app-header">
            <div className="header-top">
                <div className="header-logo-box">
                    <div className="header-logo">LOGO</div>
                </div>

                <div className="header-nav-placeholder"></div>

                <button className="header-profile">Profile</button>
            </div>

            <div className="header-bottom">
                <div className="header-search-wrapper">
                    <span className="header-search-icon">⌕</span>
                    <input
                       className="header-search-input"
                       type="text"
                       placeholder="Search items..."
                    />
                </div>
            </div>
        </header>
    );
}

export default Header;