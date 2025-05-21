/**
 * Dynamically creates and inserts the nav bar into the page.
 * 
 * @export
 */
export function setupNav() {
    const page = document.querySelector("[data-page]").dataset.page;
    const nav = document.createElement("nav");
    nav.id = "nav";

    let location = (page === "index") ? "" : "../";
    nav.innerHTML = `
        <div class="nav-item">
            
            <a href="${location}index.html">
                <h1 class="logo"><span style="color: #FF3355">H</span>adron</h1>
                <!-- logo.png -->
            </a>
        </div>
        <div class="nav-item nav-list">
            <ul>
                <li class="nav-item list-item" id="products"><a href="${location}pages/productListing.html">Products</a></li>
                <li class="nav-item list-item" id="about"><a href="${location}pages/about.html">About</a></li>
                <li class="nav-item list-item" id="contact"><a href="${location}pages/contact.html">Contact</a></li>
            </ul>
        </div>
        <div class="nav-item">
            <div class="icon-link">
                <a id="cart" href="${location}pages/cart.html">
                    <i class="bi bi-cart-fill"></i>
                </a>
            </div>
            <div class="icon-link">
                <a href="${location}pages/signIn.html">
                    <i class="bi bi-person-circle"></i>
                </a>
            </div>
            <button class="theme-switch" onclick="document.documentElement.setAttribute('data-theme', 'dark');">Dark</button>
            <button class="theme-switch" onclick="document.documentElement.setAttribute('data-theme', 'light');">Light</button>
        </div>
    `;

    if(document.body.firstChild) {
        document.body.insertBefore(nav, document.body.firstChild)
    }
    

}