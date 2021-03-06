<?php ?>
    <nav class="navbar navbar-nav-right col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div class="navbar-brand-wrapper d-flex justify-content-center">
            <div class="navbar-brand-inner-wrapper d-flex justify-content-between align-items-center w-100">
                <button class="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
                    <span class="mdi mdi mdi-menu"></span>
                </button>
                <a class="navbar-brand brand-logo" href="../site/index.html"><img src="images/logo.jpeg" alt="logo"/></a>
                <a class="navbar-brand brand-logo-mini" href="../site/index.html"><img src="images/logo-mini.svg" alt="logo"/></a>
            </div>
        </div>
        <div class="navbar-menu-wrapper d-flex align-items-center justify-content-end">
            <!--Search bar-->
            <ul class="navbar-nav mr-lg-4 w-100">
                <li class="nav-item nav-search d-none d-lg-block w-100">
                    <div class="input-group">
                        <div class="input-group-prepend">
                    <span class="input-group-text" id="search">
                      <i class="mdi mdi-magnify"></i>
                    </span>
                        </div>
                        <input type="text" class="form-control" placeholder="חפש תיק, עד וכל דבר שבא לך" aria-label="search" aria-describedby="search">
                    </div>
                </li>
            </ul>
            <ul class="navbar-nav navbar-nav-left">
                <!--message-->
                <li class="nav-item dropdown mr-1">
                    <a class="nav-link count-indicator dropdown-toggle d-flex justify-content-center align-items-center" id="messageDropdown" href="#" data-toggle="dropdown">
                        <i class="mdi mdi-message-text mx-0"></i>
                        <span class="count"></span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="messageDropdown">
                        <p class="mb-0 font-weight-normal dropdown-header">Messages</p>
                        <a class="dropdown-item">
                            <div class="item-thumbnail">
                                <img src="images/faces/face4.jpg" alt="image" class="profile-pic">
                            </div>
                            <div class="item-content flex-grow ">
                                <h6 class="ellipsis font-weight-normal">Itai Dagan
                                </h6>
                                <p class="font-weight-light small-text text-muted mb-0">
                                    הפגישה מבוטלת
                                </p>
                            </div>
                        </a>
                        <a class="dropdown-item">
                            <div class="item-thumbnail">
                                <img src="images/faces/face2.jpg" alt="image" class="profile-pic">
                            </div>
                            <div class="item-content flex-grow">
                                <h6 class="ellipsis font-weight-normal">Tomer Godeli
                                </h6>
                                <p class="font-weight-light small-text text-muted mb-0">
                                    אל תשכחי את המצגת
                                </p>
                            </div>
                        </a>
                        <a class="dropdown-item">
                            <div class="item-thumbnail">
                                <img src="images/faces/face3.jpg" alt="image" class="profile-pic">
                            </div>
                            <div class="item-content flex-grow">
                                <h6 class="ellipsis font-weight-normal"> Tomer Gofman
                                </h6>
                                <p class="font-weight-light small-text text-muted mb-0">
                                    נפגש בקרוב!
                                </p>
                            </div>
                        </a>
                    </div>
                </li>
                <!--Notifications-->
                <li class="nav-item dropdown mr-4">
                    <a class="nav-link count-indicator dropdown-toggle d-flex align-items-center justify-content-center notification-dropdown" id="notificationDropdown" href="#" data-toggle="dropdown">
                        <i class="mdi mdi-bell mx-0"></i>
                        <span class="count"></span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="notificationDropdown">
                        <p class="mb-0 font-weight-normal float-left dropdown-header">Notifications</p>
                        <a class="dropdown-item">
                            <div class="item-thumbnail">
                                <div class="item-icon bg-success">
                                    <i class="mdi mdi-information mx-0"></i>
                                </div>
                            </div>
                            <div class="item-content">
                                <h6 class="font-weight-normal">Application Error</h6>
                                <p class="font-weight-light small-text mb-0 text-muted">
                                    Just now
                                </p>
                            </div>
                        </a>
                        <a class="dropdown-item">
                            <div class="item-thumbnail">
                                <div class="item-icon bg-warning">
                                    <i class="mdi mdi-settings mx-0"></i>
                                </div>
                            </div>
                            <div class="item-content">
                                <h6 class="font-weight-normal">הגדרות</h6>
                                <p class="font-weight-light small-text mb-0 text-muted">
                                    Private message
                                </p>
                            </div>
                        </a>
                        <a class="dropdown-item">
                            <div class="item-thumbnail">
                                <div class="item-icon bg-info">
                                    <i class="mdi mdi-account-box mx-0"></i>
                                </div>
                            </div>
                            <div class="item-content">
                                <h6 class="font-weight-normal">New user registration</h6>
                                <p class="font-weight-light small-text mb-0 text-muted">
                                    2 days ago
                                </p>
                            </div>
                        </a>
                    </div>
                </li>
                <!--Profile-->
                <li class="nav-item nav-profile dropdown">
                    <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" id="profileDropdown">
                        <img src="images/faces/face5.jpg" alt="profile"/>
                        <span class="nav-profile-name">תומר גודלי</span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
                        <a class="dropdown-item">
                            <i class="mdi mdi-settings text-primary"></i>
                            Settings
                        </a>
                        <a class="dropdown-item">
                            <i class="mdi mdi-logout text-primary"></i>
                            Logout
                        </a>
                    </div>
                </li>
            </ul>
            <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
                <span class="mdi mdi-menu"></span>
            </button>
        </div>
    </nav>
    <!--End Of navigation bar-->
    <!--content-->
    <div class="container-fluid page-body-wrapper rtl">
        <!-- partial:partials/_sidebar.html -->
        <nav class="sidebar sidebar-offcanvas" id="sidebar">
            <ul class="nav rtl">
                <li class="nav-item">
                    <a class="nav-link" href="../site/index.html">
                        <i class="mdi mdi-home menu-icon"></i>
                        <span class="menu-title">Dashboard</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-toggle="collapse" href="#cases" aria-expanded="false" aria-controls="ui-basic">
                        <i class="mdi mdi mdi-folder menu-icon"></i>
                        <span class="menu-title">התיקים שלי</span>
                        <i class="menu-arrow"></i>
                    </a>
                    <div class="collapse" id="cases">
                        <ul class="nav flex-column sub-menu" dir="rtl">
                            <li class="nav-item"> <a class="nav-link" href="pages/cases/exist-case.html">תיקים קיימים</a></li>
                            <li class="nav-item"> <a class="nav-link" href="pages/cases/add-case.html">הוסף תיק חדש</a></li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-toggle="collapse" href="#hearing" aria-expanded="false" aria-controls="ui-basic">
                        <i class="mdi mdi mdi-folder menu-icon"></i>
                        <span class="menu-title">הדיונים שלי</span>
                        <i class="menu-arrow"></i>
                    </a>
                    <div class="collapse" id="hearing">
                        <ul class="nav flex-column sub-menu" dir="rtl">
                            <li class="nav-item"> <a class="nav-link" href="../site/pages/hearing/my-hearing.html">כל הדיונים</a></li>
                            <li class="nav-item"> <a class="nav-link" href="/hearing/add-hearing.html">הוסף דיון</a></li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-toggle="collapse" href="#witnesses" aria-expanded="false" aria-controls="auth">
                        <i class="mdi mdi-account menu-icon"></i>
                        <span class="menu-title">עדים</span>
                        <i class="menu-arrow"></i>
                    </a>
                    <div class="collapse" id="witnesses">
                        <ul class="nav flex-column sub-menu" dir="rtl">
                            <li class="nav-item"> <a class="nav-link" href="pages/witnesses/witnesses.html">כל העדים</a></li>
                            <li class="nav-item"> <a class="nav-link" href="pages/witnesses/add-witnesses.html">הוסף עדים</a></li>
                        </ul>
                    </div>
                </li>
            </ul>
        </nav>
    </div>