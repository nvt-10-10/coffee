<template>
    <header class="header">
        <div class="container-lg">
            <div class="header-xs">
                <!-- navbar pc -->
                <nav class="navbar d-xs-block">
                    <ul class="nav-list d-flex">
                        <li class="nav-item">
                            <a href="#" class="nav-link">Home</a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link">About Us</a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link">Services</a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link">Store</a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link">Contact Us</a>
                        </li>
                    </ul>

                    <div class="header-card">
                        <a class="menu d-none">
                            <i class="fa-solid fa-bars"></i>
                        </a>
                        <img
                            src="../../../../assets/icons/card.svg"
                            alt=""
                            class="icon-card"
                        />
                    </div>
                </nav>
                <!-- menu mobile -->
                <div class="menu-mobile d-none d-xs-block">
                    <div class="menu-overlay"></div>
                    <div class="menu-drawer">
                        <ul class="nav-list d-flex flex-column">
                            <li class="nav-item">
                                <a href="#" class="nav-link">Home</a>
                            </li>
                            <li class="nav-item">
                                <a href="#" class="nav-link">About Us</a>
                            </li>
                            <li class="nav-item">
                                <a href="#" class="nav-link">Services</a>
                            </li>
                            <li class="nav-item">
                                <a href="#" class="nav-link">Store</a>
                            </li>
                            <li class="nav-item">
                                <a href="#" class="nav-link">Contact Us</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="header-content">
                    <div class="row">
                        <div class="col-sm-12 col-md-6">
                            <h1 class="header-heading">LIFE IS NOT BETTER</h1>

                            <a href="" class="btn">Order Now</a>

                            <span>WITHOUT COFFEE</span>
                        </div>
                    </div>
                </div>

                <a href="" class="menu-toggle d-none"
                    ><i class="fa-solid fa-bars"></i
                ></a>
            </div>
        </div>
    </header>
    <router-view></router-view>
</template>
