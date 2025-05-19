export function setupNav() {
    const nav = document.createElement("nav");
    nav.id = "nav";
    nav.innerHTML = `
        <span class="nav-item">
            
            <a href="/index.html">
                <h1 style="transform: scaleY(1.25)"><span style="color: #FF3355">H</span>adron</h1>
                <!-- logo.png -->
            </a>
        </span>
        <span class="nav-item nav-list">
            <ul>
                <li class="nav-item list-item" id="products"><a href="/pages/productListing.html">Products</a></li>
                <li class="nav-item list-item" id="about"><a href="/pages/about.html">About</a></li>
                <li class="nav-item list-item" id="contact"><a href="/pages/contact.html">Contact</a></li>
            </ul>
        </span>
        <span class="nav-item">
            <div class="icon-link">
                <a id="cart" href="/pages/cart.html">
                    <i class="bi bi-cart-fill"></i>
                </a>
            </div>
            <div class="icon-link">
                <a href="/pages/signIn.html">
                    <i class="bi bi-person-circle"></i>
                </a>
            </div>
        </span>
    `;

    if(document.body.firstChild) {
        document.body.insertBefore(nav, document.body.firstChild)
    }
    

}