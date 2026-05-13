<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\CoreExtension;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;
use Twig\TemplateWrapper;

/* layout/navbar.html.twig */
class __TwigTemplate_76abe281cf7fc0fdc0376dc06bd5b18a extends Template
{
    private Source $source;
    /**
     * @var array<string, Template>
     */
    private array $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
        ];
    }

    protected function doDisplay(array $context, array $blocks = []): iterable
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "layout/navbar.html.twig"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "layout/navbar.html.twig"));

        // line 1
        yield "<!DOCTYPE html>
<html>
    <head>

    </head>
    <body>
        <div class=\"nav\">
            <nav class=\"nav-left\">

                <ul class=\"nav-list\">
                    <a href=\"/\">
                        <img class=\"nav-logo\" src=\"";
        // line 12
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Symfony\Bridge\Twig\Extension\AssetExtension']->getAssetUrl("images/logo.png"), "html", null, true);
        yield "\" alt=\"logo\">
                    </a>
                    <a href=\"";
        // line 14
        yield $this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getPath("app_games");
        yield "\"><li class=\"nav-items\">JEUX</li>
                    <li class=\"nav-items\">ACTUALITÉS</li></a>
                    <li class=\"nav-items\">VÉRIFIER MON SETUP</li>

                </ul>
            </nav>
            <nav class\"nav-right\">
            <ul class=\"nav-list\">
                <li class=\"nav-btn\">MA BIBLIOTHÈQUE</li>
                <a class=\"align\">
                    ";
        // line 24
        if ((($tmp = CoreExtension::getAttribute($this->env, $this->source, (isset($context["app"]) || array_key_exists("app", $context) ? $context["app"] : (function () { throw new RuntimeError('Variable "app" does not exist.', 24, $this->source); })()), "user", [], "any", false, false, false, 24)) && $tmp instanceof Markup ? (string) $tmp : $tmp)) {
            // line 25
            yield "                    <a href=\"";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getPath("app_user_show", ["id_user" => CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, (isset($context["app"]) || array_key_exists("app", $context) ? $context["app"] : (function () { throw new RuntimeError('Variable "app" does not exist.', 25, $this->source); })()), "user", [], "any", false, false, false, 25), "id_user", [], "any", false, false, false, 25)]), "html", null, true);
            yield "\"><i class=\"nav-icons\" data-lucide=\"user\"></i></a>
                    ";
        } else {
            // line 27
            yield "                    <a href=\"";
            yield $this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getPath("app_login");
            yield "\"><i class=\"nav-icons\" data-lucide=\"user\"></i></a>
                    ";
        }
        // line 29
        yield "                    <i data-lucide=\"chevron-down\"></i>               
             
                </a>
                </ul>
            </nav>
        </div>
    <script>lucide.createIcons();</script>

    </body>

</html>";
        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        yield from [];
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName(): string
    {
        return "layout/navbar.html.twig";
    }

    /**
     * @codeCoverageIgnore
     */
    public function isTraitable(): bool
    {
        return false;
    }

    /**
     * @codeCoverageIgnore
     */
    public function getDebugInfo(): array
    {
        return array (  93 => 29,  87 => 27,  81 => 25,  79 => 24,  66 => 14,  61 => 12,  48 => 1,);
    }

    public function getSourceContext(): Source
    {
        return new Source("<!DOCTYPE html>
<html>
    <head>

    </head>
    <body>
        <div class=\"nav\">
            <nav class=\"nav-left\">

                <ul class=\"nav-list\">
                    <a href=\"/\">
                        <img class=\"nav-logo\" src=\"{{ asset('images/logo.png') }}\" alt=\"logo\">
                    </a>
                    <a href=\"{{ path('app_games') }}\"><li class=\"nav-items\">JEUX</li>
                    <li class=\"nav-items\">ACTUALITÉS</li></a>
                    <li class=\"nav-items\">VÉRIFIER MON SETUP</li>

                </ul>
            </nav>
            <nav class\"nav-right\">
            <ul class=\"nav-list\">
                <li class=\"nav-btn\">MA BIBLIOTHÈQUE</li>
                <a class=\"align\">
                    {% if app.user %}
                    <a href=\"{{ path('app_user_show', {'id_user': app.user.id_user}) }}\"><i class=\"nav-icons\" data-lucide=\"user\"></i></a>
                    {% else %}
                    <a href=\"{{ path('app_login') }}\"><i class=\"nav-icons\" data-lucide=\"user\"></i></a>
                    {% endif %}
                    <i data-lucide=\"chevron-down\"></i>               
             
                </a>
                </ul>
            </nav>
        </div>
    <script>lucide.createIcons();</script>

    </body>

<<<<<<< HEAD
</html>", "layout/navbar.html.twig", "C:\\Users\\aurel\\Documents\\visualstudiocode\\projetdespecialite\\groupe\\Projet-de-specialite\\back\\templates\\layout\\navbar.html.twig");
=======
</html>", "layout/navbar.html.twig", "C:\\Users\\jimmy\\OneDrive\\Documents\\DevCode\\Jeuxverifnote\\api\\Projet-de-specialite\\back\\templates\\layout\\navbar.html.twig");
>>>>>>> 106b221696bf2a1f81345fdf9a0ade453a0274e2
    }
}
