'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">ecommerce documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-6358be2c9a54787733bbaa72d36a9df7b05b33b3267c1a47db294090ac5bbcefe8753705942e1e335d96955cb6e4050d7e030977573114069b00d17e61eb024d"' : 'data-target="#xs-controllers-links-module-AppModule-6358be2c9a54787733bbaa72d36a9df7b05b33b3267c1a47db294090ac5bbcefe8753705942e1e335d96955cb6e4050d7e030977573114069b00d17e61eb024d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-6358be2c9a54787733bbaa72d36a9df7b05b33b3267c1a47db294090ac5bbcefe8753705942e1e335d96955cb6e4050d7e030977573114069b00d17e61eb024d"' :
                                            'id="xs-controllers-links-module-AppModule-6358be2c9a54787733bbaa72d36a9df7b05b33b3267c1a47db294090ac5bbcefe8753705942e1e335d96955cb6e4050d7e030977573114069b00d17e61eb024d"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/PaymentsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaymentsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-6358be2c9a54787733bbaa72d36a9df7b05b33b3267c1a47db294090ac5bbcefe8753705942e1e335d96955cb6e4050d7e030977573114069b00d17e61eb024d"' : 'data-target="#xs-injectables-links-module-AppModule-6358be2c9a54787733bbaa72d36a9df7b05b33b3267c1a47db294090ac5bbcefe8753705942e1e335d96955cb6e4050d7e030977573114069b00d17e61eb024d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-6358be2c9a54787733bbaa72d36a9df7b05b33b3267c1a47db294090ac5bbcefe8753705942e1e335d96955cb6e4050d7e030977573114069b00d17e61eb024d"' :
                                        'id="xs-injectables-links-module-AppModule-6358be2c9a54787733bbaa72d36a9df7b05b33b3267c1a47db294090ac5bbcefe8753705942e1e335d96955cb6e4050d7e030977573114069b00d17e61eb024d"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CartsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CartsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DeliveryService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeliveryService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GoogleStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GoogleStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PaymentsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaymentsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ProductsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/StripeService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StripeService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-d3854fa857443f81e0f8c9992cc0300bbde08e05c130de8baebb8bf609900fca504b1c4c01199b0f720676bc6b18b93262a7f791ccfe2a76957fec5b97b31562"' : 'data-target="#xs-injectables-links-module-AuthModule-d3854fa857443f81e0f8c9992cc0300bbde08e05c130de8baebb8bf609900fca504b1c4c01199b0f720676bc6b18b93262a7f791ccfe2a76957fec5b97b31562"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-d3854fa857443f81e0f8c9992cc0300bbde08e05c130de8baebb8bf609900fca504b1c4c01199b0f720676bc6b18b93262a7f791ccfe2a76957fec5b97b31562"' :
                                        'id="xs-injectables-links-module-AuthModule-d3854fa857443f81e0f8c9992cc0300bbde08e05c130de8baebb8bf609900fca504b1c4c01199b0f720676bc6b18b93262a7f791ccfe2a76957fec5b97b31562"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CartsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CartsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DeliveryService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeliveryService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FacebookStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FacebookStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GoogleStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GoogleStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ProductsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/StripeService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StripeService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CartsModule.html" data-type="entity-link" >CartsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-CartsModule-dea250656a5c27134796f6a183d3c4dcc0d5861dd686778ebbb7d7b10cfa598cc160dd9592390917a7294a6b3f8c7d86f9367e0409009a98b9648f524a73380b"' : 'data-target="#xs-controllers-links-module-CartsModule-dea250656a5c27134796f6a183d3c4dcc0d5861dd686778ebbb7d7b10cfa598cc160dd9592390917a7294a6b3f8c7d86f9367e0409009a98b9648f524a73380b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CartsModule-dea250656a5c27134796f6a183d3c4dcc0d5861dd686778ebbb7d7b10cfa598cc160dd9592390917a7294a6b3f8c7d86f9367e0409009a98b9648f524a73380b"' :
                                            'id="xs-controllers-links-module-CartsModule-dea250656a5c27134796f6a183d3c4dcc0d5861dd686778ebbb7d7b10cfa598cc160dd9592390917a7294a6b3f8c7d86f9367e0409009a98b9648f524a73380b"' }>
                                            <li class="link">
                                                <a href="controllers/CartsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CartsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CartsModule-dea250656a5c27134796f6a183d3c4dcc0d5861dd686778ebbb7d7b10cfa598cc160dd9592390917a7294a6b3f8c7d86f9367e0409009a98b9648f524a73380b"' : 'data-target="#xs-injectables-links-module-CartsModule-dea250656a5c27134796f6a183d3c4dcc0d5861dd686778ebbb7d7b10cfa598cc160dd9592390917a7294a6b3f8c7d86f9367e0409009a98b9648f524a73380b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CartsModule-dea250656a5c27134796f6a183d3c4dcc0d5861dd686778ebbb7d7b10cfa598cc160dd9592390917a7294a6b3f8c7d86f9367e0409009a98b9648f524a73380b"' :
                                        'id="xs-injectables-links-module-CartsModule-dea250656a5c27134796f6a183d3c4dcc0d5861dd686778ebbb7d7b10cfa598cc160dd9592390917a7294a6b3f8c7d86f9367e0409009a98b9648f524a73380b"' }>
                                        <li class="link">
                                            <a href="injectables/CartsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CartsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ProductsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DeliveryModule.html" data-type="entity-link" >DeliveryModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-DeliveryModule-be89a34b2563a3ced24b3d6a7bbe717c210e64d92c025f6bda766bb384276b835dc7f50c521330f863a2533de4c09c34f5511f19e2f25640debd9cecedd9e528"' : 'data-target="#xs-controllers-links-module-DeliveryModule-be89a34b2563a3ced24b3d6a7bbe717c210e64d92c025f6bda766bb384276b835dc7f50c521330f863a2533de4c09c34f5511f19e2f25640debd9cecedd9e528"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-DeliveryModule-be89a34b2563a3ced24b3d6a7bbe717c210e64d92c025f6bda766bb384276b835dc7f50c521330f863a2533de4c09c34f5511f19e2f25640debd9cecedd9e528"' :
                                            'id="xs-controllers-links-module-DeliveryModule-be89a34b2563a3ced24b3d6a7bbe717c210e64d92c025f6bda766bb384276b835dc7f50c521330f863a2533de4c09c34f5511f19e2f25640debd9cecedd9e528"' }>
                                            <li class="link">
                                                <a href="controllers/DeliveryController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeliveryController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-DeliveryModule-be89a34b2563a3ced24b3d6a7bbe717c210e64d92c025f6bda766bb384276b835dc7f50c521330f863a2533de4c09c34f5511f19e2f25640debd9cecedd9e528"' : 'data-target="#xs-injectables-links-module-DeliveryModule-be89a34b2563a3ced24b3d6a7bbe717c210e64d92c025f6bda766bb384276b835dc7f50c521330f863a2533de4c09c34f5511f19e2f25640debd9cecedd9e528"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DeliveryModule-be89a34b2563a3ced24b3d6a7bbe717c210e64d92c025f6bda766bb384276b835dc7f50c521330f863a2533de4c09c34f5511f19e2f25640debd9cecedd9e528"' :
                                        'id="xs-injectables-links-module-DeliveryModule-be89a34b2563a3ced24b3d6a7bbe717c210e64d92c025f6bda766bb384276b835dc7f50c521330f863a2533de4c09c34f5511f19e2f25640debd9cecedd9e528"' }>
                                        <li class="link">
                                            <a href="injectables/CartsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CartsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DeliveryService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeliveryService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ProductsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/StripeService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StripeService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PaymentsModule.html" data-type="entity-link" >PaymentsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-PaymentsModule-2feedda9f95a2ffe9f4c5da75656fb4d2451497ba5e27398dc1ef0a903077d97a46ef2b71b461c012fb353be2f5da05e77691434701005b8ce5e1f18e0b01dcc"' : 'data-target="#xs-controllers-links-module-PaymentsModule-2feedda9f95a2ffe9f4c5da75656fb4d2451497ba5e27398dc1ef0a903077d97a46ef2b71b461c012fb353be2f5da05e77691434701005b8ce5e1f18e0b01dcc"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PaymentsModule-2feedda9f95a2ffe9f4c5da75656fb4d2451497ba5e27398dc1ef0a903077d97a46ef2b71b461c012fb353be2f5da05e77691434701005b8ce5e1f18e0b01dcc"' :
                                            'id="xs-controllers-links-module-PaymentsModule-2feedda9f95a2ffe9f4c5da75656fb4d2451497ba5e27398dc1ef0a903077d97a46ef2b71b461c012fb353be2f5da05e77691434701005b8ce5e1f18e0b01dcc"' }>
                                            <li class="link">
                                                <a href="controllers/PaymentsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaymentsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PaymentsModule-2feedda9f95a2ffe9f4c5da75656fb4d2451497ba5e27398dc1ef0a903077d97a46ef2b71b461c012fb353be2f5da05e77691434701005b8ce5e1f18e0b01dcc"' : 'data-target="#xs-injectables-links-module-PaymentsModule-2feedda9f95a2ffe9f4c5da75656fb4d2451497ba5e27398dc1ef0a903077d97a46ef2b71b461c012fb353be2f5da05e77691434701005b8ce5e1f18e0b01dcc"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PaymentsModule-2feedda9f95a2ffe9f4c5da75656fb4d2451497ba5e27398dc1ef0a903077d97a46ef2b71b461c012fb353be2f5da05e77691434701005b8ce5e1f18e0b01dcc"' :
                                        'id="xs-injectables-links-module-PaymentsModule-2feedda9f95a2ffe9f4c5da75656fb4d2451497ba5e27398dc1ef0a903077d97a46ef2b71b461c012fb353be2f5da05e77691434701005b8ce5e1f18e0b01dcc"' }>
                                        <li class="link">
                                            <a href="injectables/CartsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CartsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DeliveryService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeliveryService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PaymentsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaymentsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ProductsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/StripeService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StripeService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductsModule.html" data-type="entity-link" >ProductsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ProductsModule-3daedc8049e600c1d3cd99c84dc66b32573415a02bc3d98edfa42acd2746f19fa815a778f5e30cc755dae9b0b8f79bb6ea25b625d7160b3c7fd19fff61c1cc6c"' : 'data-target="#xs-controllers-links-module-ProductsModule-3daedc8049e600c1d3cd99c84dc66b32573415a02bc3d98edfa42acd2746f19fa815a778f5e30cc755dae9b0b8f79bb6ea25b625d7160b3c7fd19fff61c1cc6c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProductsModule-3daedc8049e600c1d3cd99c84dc66b32573415a02bc3d98edfa42acd2746f19fa815a778f5e30cc755dae9b0b8f79bb6ea25b625d7160b3c7fd19fff61c1cc6c"' :
                                            'id="xs-controllers-links-module-ProductsModule-3daedc8049e600c1d3cd99c84dc66b32573415a02bc3d98edfa42acd2746f19fa815a778f5e30cc755dae9b0b8f79bb6ea25b625d7160b3c7fd19fff61c1cc6c"' }>
                                            <li class="link">
                                                <a href="controllers/ProductsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ProductsModule-3daedc8049e600c1d3cd99c84dc66b32573415a02bc3d98edfa42acd2746f19fa815a778f5e30cc755dae9b0b8f79bb6ea25b625d7160b3c7fd19fff61c1cc6c"' : 'data-target="#xs-injectables-links-module-ProductsModule-3daedc8049e600c1d3cd99c84dc66b32573415a02bc3d98edfa42acd2746f19fa815a778f5e30cc755dae9b0b8f79bb6ea25b625d7160b3c7fd19fff61c1cc6c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProductsModule-3daedc8049e600c1d3cd99c84dc66b32573415a02bc3d98edfa42acd2746f19fa815a778f5e30cc755dae9b0b8f79bb6ea25b625d7160b3c7fd19fff61c1cc6c"' :
                                        'id="xs-injectables-links-module-ProductsModule-3daedc8049e600c1d3cd99c84dc66b32573415a02bc3d98edfa42acd2746f19fa815a778f5e30cc755dae9b0b8f79bb6ea25b625d7160b3c7fd19fff61c1cc6c"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ProductsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ReviewsModule.html" data-type="entity-link" >ReviewsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ReviewsModule-2513e9154e6d1f55afd930d1bb3cc4075aae437cd0def8ca5f440617dabfd048413ec95ac0edb3be454c2b3e00ee5e0023552943482e2c059606b61b76974a1b"' : 'data-target="#xs-controllers-links-module-ReviewsModule-2513e9154e6d1f55afd930d1bb3cc4075aae437cd0def8ca5f440617dabfd048413ec95ac0edb3be454c2b3e00ee5e0023552943482e2c059606b61b76974a1b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ReviewsModule-2513e9154e6d1f55afd930d1bb3cc4075aae437cd0def8ca5f440617dabfd048413ec95ac0edb3be454c2b3e00ee5e0023552943482e2c059606b61b76974a1b"' :
                                            'id="xs-controllers-links-module-ReviewsModule-2513e9154e6d1f55afd930d1bb3cc4075aae437cd0def8ca5f440617dabfd048413ec95ac0edb3be454c2b3e00ee5e0023552943482e2c059606b61b76974a1b"' }>
                                            <li class="link">
                                                <a href="controllers/ReviewsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReviewsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ReviewsModule-2513e9154e6d1f55afd930d1bb3cc4075aae437cd0def8ca5f440617dabfd048413ec95ac0edb3be454c2b3e00ee5e0023552943482e2c059606b61b76974a1b"' : 'data-target="#xs-injectables-links-module-ReviewsModule-2513e9154e6d1f55afd930d1bb3cc4075aae437cd0def8ca5f440617dabfd048413ec95ac0edb3be454c2b3e00ee5e0023552943482e2c059606b61b76974a1b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ReviewsModule-2513e9154e6d1f55afd930d1bb3cc4075aae437cd0def8ca5f440617dabfd048413ec95ac0edb3be454c2b3e00ee5e0023552943482e2c059606b61b76974a1b"' :
                                        'id="xs-injectables-links-module-ReviewsModule-2513e9154e6d1f55afd930d1bb3cc4075aae437cd0def8ca5f440617dabfd048413ec95ac0edb3be454c2b3e00ee5e0023552943482e2c059606b61b76974a1b"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ReviewsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReviewsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/StripeModule.html" data-type="entity-link" >StripeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-StripeModule-373257992e7fbe839b9e01b513bf1002a26320bdabc8f809ca248338cb97cef323661d4ba46ce959a3b80c499f7e7c4971895f0162061387fd00e616e38b8253"' : 'data-target="#xs-controllers-links-module-StripeModule-373257992e7fbe839b9e01b513bf1002a26320bdabc8f809ca248338cb97cef323661d4ba46ce959a3b80c499f7e7c4971895f0162061387fd00e616e38b8253"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-StripeModule-373257992e7fbe839b9e01b513bf1002a26320bdabc8f809ca248338cb97cef323661d4ba46ce959a3b80c499f7e7c4971895f0162061387fd00e616e38b8253"' :
                                            'id="xs-controllers-links-module-StripeModule-373257992e7fbe839b9e01b513bf1002a26320bdabc8f809ca248338cb97cef323661d4ba46ce959a3b80c499f7e7c4971895f0162061387fd00e616e38b8253"' }>
                                            <li class="link">
                                                <a href="controllers/StripeController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StripeController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-StripeModule-373257992e7fbe839b9e01b513bf1002a26320bdabc8f809ca248338cb97cef323661d4ba46ce959a3b80c499f7e7c4971895f0162061387fd00e616e38b8253"' : 'data-target="#xs-injectables-links-module-StripeModule-373257992e7fbe839b9e01b513bf1002a26320bdabc8f809ca248338cb97cef323661d4ba46ce959a3b80c499f7e7c4971895f0162061387fd00e616e38b8253"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-StripeModule-373257992e7fbe839b9e01b513bf1002a26320bdabc8f809ca248338cb97cef323661d4ba46ce959a3b80c499f7e7c4971895f0162061387fd00e616e38b8253"' :
                                        'id="xs-injectables-links-module-StripeModule-373257992e7fbe839b9e01b513bf1002a26320bdabc8f809ca248338cb97cef323661d4ba46ce959a3b80c499f7e7c4971895f0162061387fd00e616e38b8253"' }>
                                        <li class="link">
                                            <a href="injectables/CartsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CartsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DeliveryService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeliveryService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ProductsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/StripeService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StripeService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UsersModule-d95c6943cb55a74eede18778b66465f1312f073df3c2b21ad4662054ad4cffa5833b6814d2a1857f7b218b0841c48e949c9fd1af12d89ec5c6c6230f2f2d5106"' : 'data-target="#xs-controllers-links-module-UsersModule-d95c6943cb55a74eede18778b66465f1312f073df3c2b21ad4662054ad4cffa5833b6814d2a1857f7b218b0841c48e949c9fd1af12d89ec5c6c6230f2f2d5106"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-d95c6943cb55a74eede18778b66465f1312f073df3c2b21ad4662054ad4cffa5833b6814d2a1857f7b218b0841c48e949c9fd1af12d89ec5c6c6230f2f2d5106"' :
                                            'id="xs-controllers-links-module-UsersModule-d95c6943cb55a74eede18778b66465f1312f073df3c2b21ad4662054ad4cffa5833b6814d2a1857f7b218b0841c48e949c9fd1af12d89ec5c6c6230f2f2d5106"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UsersModule-d95c6943cb55a74eede18778b66465f1312f073df3c2b21ad4662054ad4cffa5833b6814d2a1857f7b218b0841c48e949c9fd1af12d89ec5c6c6230f2f2d5106"' : 'data-target="#xs-injectables-links-module-UsersModule-d95c6943cb55a74eede18778b66465f1312f073df3c2b21ad4662054ad4cffa5833b6814d2a1857f7b218b0841c48e949c9fd1af12d89ec5c6c6230f2f2d5106"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-d95c6943cb55a74eede18778b66465f1312f073df3c2b21ad4662054ad4cffa5833b6814d2a1857f7b218b0841c48e949c9fd1af12d89ec5c6c6230f2f2d5106"' :
                                        'id="xs-injectables-links-module-UsersModule-d95c6943cb55a74eede18778b66465f1312f073df3c2b21ad4662054ad4cffa5833b6814d2a1857f7b218b0841c48e949c9fd1af12d89ec5c6c6230f2f2d5106"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CartsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CartsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DeliveryService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeliveryService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ProductsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/StripeService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StripeService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/addProductDataDTO.html" data-type="entity-link" >addProductDataDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/addProductDTO.html" data-type="entity-link" >addProductDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddToCartDTO.html" data-type="entity-link" >AddToCartDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/BodyChargeDto.html" data-type="entity-link" >BodyChargeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCartDTO.html" data-type="entity-link" >CreateCartDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProductDto.html" data-type="entity-link" >CreateProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateReviewDto.html" data-type="entity-link" >CreateReviewDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DataChargeDto.html" data-type="entity-link" >DataChargeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeliveryData.html" data-type="entity-link" >DeliveryData</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeliveryData-1.html" data-type="entity-link" >DeliveryData</a>
                            </li>
                            <li class="link">
                                <a href="classes/filtersProductsDTO.html" data-type="entity-link" >filtersProductsDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/FindManyIdsDTO.html" data-type="entity-link" >FindManyIdsDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/newPaymentDTO.html" data-type="entity-link" >newPaymentDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaymentDTO.html" data-type="entity-link" >PaymentDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/QuantityShortDTO.html" data-type="entity-link" >QuantityShortDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/SerializeInterceptor.html" data-type="entity-link" >SerializeInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="classes/Sustainable.html" data-type="entity-link" >Sustainable</a>
                            </li>
                            <li class="link">
                                <a href="classes/TokenDto.html" data-type="entity-link" >TokenDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Total_cartDTO.html" data-type="entity-link" >Total_cartDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateReviewDto.html" data-type="entity-link" >UpdateReviewDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/userAuthDTO.html" data-type="entity-link" >userAuthDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserCartDTO.html" data-type="entity-link" >UserCartDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserDto.html" data-type="entity-link" >UserDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/CurrentCartMiddleware.html" data-type="entity-link" >CurrentCartMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CurrentUserMiddleware.html" data-type="entity-link" >CurrentUserMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link" >LocalAuthGuard</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AdminGUard.html" data-type="entity-link" >AdminGUard</a>
                            </li>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Adress.html" data-type="entity-link" >Adress</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/adressBillCreate.html" data-type="entity-link" >adressBillCreate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/adressDeliveryCreate.html" data-type="entity-link" >adressDeliveryCreate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CartDbData.html" data-type="entity-link" >CartDbData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Carts.html" data-type="entity-link" >Carts</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ClassConstructor.html" data-type="entity-link" >ClassConstructor</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/createUser.html" data-type="entity-link" >createUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/googleJWT.html" data-type="entity-link" >googleJWT</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/newReview.html" data-type="entity-link" >newReview</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrderBy.html" data-type="entity-link" >OrderBy</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ownerCart.html" data-type="entity-link" >ownerCart</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PaymentsFilters.html" data-type="entity-link" >PaymentsFilters</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PicturesTags.html" data-type="entity-link" >PicturesTags</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/productsCart.html" data-type="entity-link" >productsCart</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProductSizes.html" data-type="entity-link" >ProductSizes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Request.html" data-type="entity-link" >Request</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Request-1.html" data-type="entity-link" >Request</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});