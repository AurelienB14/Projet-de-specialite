<?php

/**
 * This file has been auto-generated
 * by the Symfony Routing Component.
 */

return [
    false, // $matchHost
    [ // $staticRoutes
        '/_wdt/styles' => [[['_route' => '_wdt_stylesheet', '_controller' => 'web_profiler.controller.profiler::toolbarStylesheetAction'], null, null, null, false, false, null]],
        '/_profiler' => [[['_route' => '_profiler_home', '_controller' => 'web_profiler.controller.profiler::homeAction'], null, null, null, true, false, null]],
        '/_profiler/search' => [[['_route' => '_profiler_search', '_controller' => 'web_profiler.controller.profiler::searchAction'], null, null, null, false, false, null]],
        '/_profiler/search_bar' => [[['_route' => '_profiler_search_bar', '_controller' => 'web_profiler.controller.profiler::searchBarAction'], null, null, null, false, false, null]],
        '/_profiler/phpinfo' => [[['_route' => '_profiler_phpinfo', '_controller' => 'web_profiler.controller.profiler::phpinfoAction'], null, null, null, false, false, null]],
        '/_profiler/xdebug' => [[['_route' => '_profiler_xdebug', '_controller' => 'web_profiler.controller.profiler::xdebugAction'], null, null, null, false, false, null]],
        '/_profiler/open' => [[['_route' => '_profiler_open_file', '_controller' => 'web_profiler.controller.profiler::openAction'], null, null, null, false, false, null]],
        '/games' => [[['_route' => 'app_games', '_controller' => 'App\\Controller\\GameController::index'], null, null, null, false, false, null]],
        '/api/games' => [[['_route' => 'api_games', '_controller' => 'App\\Controller\\GameControllerApi::index'], null, null, null, false, false, null]],
        '/' => [[['_route' => 'app_home', '_controller' => 'App\\Controller\\HomeController::index'], null, null, null, false, false, null]],
        '/login' => [[['_route' => 'app_login', '_controller' => 'App\\Controller\\SecurityController::login'], null, null, null, false, false, null]],
        '/logout' => [[['_route' => 'app_logout', '_controller' => 'App\\Controller\\SecurityController::logout'], null, null, null, false, false, null]],
        '/setup' => [[['_route' => 'app_setup', '_controller' => 'App\\Controller\\SetupController::index'], null, null, null, false, false, null]],
        '/setup/create' => [[['_route' => 'app_setup_create', '_controller' => 'App\\Controller\\SetupController::create'], null, ['GET' => 0, 'POST' => 1], null, false, false, null]],
        '/user' => [[['_route' => 'app_user', '_controller' => 'App\\Controller\\UserController::index'], null, null, null, false, false, null]],
        '/user/create' => [[['_route' => 'app_user_create', '_controller' => 'App\\Controller\\UserController::create'], null, ['GET' => 0, 'POST' => 1], null, false, false, null]],
        '/api/users' => [
            [['_route' => 'api_user', '_controller' => 'App\\Controller\\UserControllerApi::index'], null, ['GET' => 0], null, false, false, null],
            [['_route' => 'api_user_create', '_controller' => 'App\\Controller\\UserControllerApi::create'], null, ['POST' => 0], null, false, false, null],
        ],
        '/api/login' => [[['_route' => 'api_login'], null, ['POST' => 0], null, false, false, null]],
    ],
    [ // $regexpList
        0 => '{^(?'
                .'|/_(?'
                    .'|error/(\\d+)(?:\\.([^/]++))?(*:38)'
                    .'|wdt/([^/]++)(*:57)'
                    .'|profiler/(?'
                        .'|font/([^/\\.]++)\\.woff2(*:98)'
                        .'|([^/]++)(?'
                            .'|/(?'
                                .'|search/results(*:134)'
                                .'|router(*:148)'
                                .'|exception(?'
                                    .'|(*:168)'
                                    .'|\\.css(*:181)'
                                .')'
                            .')'
                            .'|(*:191)'
                        .')'
                    .')'
                .')'
                .'|/game/(?'
                    .'|([^/]++)(*:219)'
                    .'|createupdate(?:/([^/]++))?(*:253)'
                    .'|delete/([^/]++)(*:276)'
                .')'
                .'|/api/(?'
                    .'|game/([^/]++)(*:306)'
                    .'|users/([^/]++)(?'
                        .'|(*:331)'
                    .')'
                .')'
                .'|/setup/([^/]++)(?'
                    .'|(*:359)'
                    .'|/(?'
                        .'|delete(*:377)'
                        .'|edit(*:389)'
                    .')'
                .')'
                .'|/user/([^/]++)(?'
                    .'|(*:416)'
                    .'|/(?'
                        .'|delete(*:434)'
                        .'|edit(*:446)'
                    .')'
                .')'
            .')/?$}sDu',
    ],
    [ // $dynamicRoutes
        38 => [[['_route' => '_preview_error', '_controller' => 'error_controller::preview', '_format' => 'html'], ['code', '_format'], null, null, false, true, null]],
        57 => [[['_route' => '_wdt', '_controller' => 'web_profiler.controller.profiler::toolbarAction'], ['token'], null, null, false, true, null]],
        98 => [[['_route' => '_profiler_font', '_controller' => 'web_profiler.controller.profiler::fontAction'], ['fontName'], null, null, false, false, null]],
        134 => [[['_route' => '_profiler_search_results', '_controller' => 'web_profiler.controller.profiler::searchResultsAction'], ['token'], null, null, false, false, null]],
        148 => [[['_route' => '_profiler_router', '_controller' => 'web_profiler.controller.router::panelAction'], ['token'], null, null, false, false, null]],
        168 => [[['_route' => '_profiler_exception', '_controller' => 'web_profiler.controller.exception_panel::body'], ['token'], null, null, false, false, null]],
        181 => [[['_route' => '_profiler_exception_css', '_controller' => 'web_profiler.controller.exception_panel::stylesheet'], ['token'], null, null, false, false, null]],
        191 => [[['_route' => '_profiler', '_controller' => 'web_profiler.controller.profiler::panelAction'], ['token'], null, null, false, true, null]],
        219 => [[['_route' => 'app_game', '_controller' => 'App\\Controller\\GameController::game'], ['id'], null, null, false, true, null]],
        253 => [[['_route' => 'app_createupdategame', 'id' => null, '_controller' => 'App\\Controller\\GameController::createupdate'], ['id'], null, null, false, true, null]],
        276 => [[['_route' => 'app_deletegame', '_controller' => 'App\\Controller\\GameController::JeuDelete'], ['id'], null, null, false, true, null]],
        306 => [[['_route' => 'api_game', '_controller' => 'App\\Controller\\GameControllerApi::game'], ['id'], null, null, false, true, null]],
        331 => [
            [['_route' => 'api_user_show', '_controller' => 'App\\Controller\\UserControllerApi::show'], ['id_user'], ['GET' => 0], null, false, true, null],
            [['_route' => 'api_user_edit', '_controller' => 'App\\Controller\\UserControllerApi::edit'], ['id_user'], ['PUT' => 0], null, false, true, null],
            [['_route' => 'api_user_delete', '_controller' => 'App\\Controller\\UserControllerApi::delete'], ['id_user'], ['DELETE' => 0], null, false, true, null],
        ],
        359 => [[['_route' => 'app_setup_show', '_controller' => 'App\\Controller\\SetupController::show'], ['id_setup'], ['GET' => 0], null, false, true, null]],
        377 => [[['_route' => 'app_setup_delete', '_controller' => 'App\\Controller\\SetupController::delete'], ['id_setup'], ['POST' => 0, 'DELETE' => 1], null, false, false, null]],
        389 => [[['_route' => 'app_setup_edit', '_controller' => 'App\\Controller\\SetupController::edit'], ['id_setup'], ['GET' => 0, 'POST' => 1], null, false, false, null]],
        416 => [[['_route' => 'app_user_show', '_controller' => 'App\\Controller\\UserController::show'], ['id_user'], ['GET' => 0], null, false, true, null]],
        434 => [[['_route' => 'app_user_delete', '_controller' => 'App\\Controller\\UserController::delete'], ['id_user'], ['POST' => 0, 'DELETE' => 1], null, false, false, null]],
        446 => [
            [['_route' => 'app_user_edit', '_controller' => 'App\\Controller\\UserController::edit'], ['id_user'], ['GET' => 0, 'POST' => 1], null, false, false, null],
            [null, null, null, null, false, false, 0],
        ],
    ],
    null, // $checkCondition
];
