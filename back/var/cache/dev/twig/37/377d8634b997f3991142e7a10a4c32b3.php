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

/* game/game.html.twig */
class __TwigTemplate_430a1a3880cf14a9de66912a504c2017 extends Template
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

        $this->blocks = [
            'title' => [$this, 'block_title'],
            'body' => [$this, 'block_body'],
        ];
    }

    protected function doGetParent(array $context): bool|string|Template|TemplateWrapper
    {
        // line 1
        return "base.html.twig";
    }

    protected function doDisplay(array $context, array $blocks = []): iterable
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "game/game.html.twig"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "game/game.html.twig"));

        $this->parent = $this->load("base.html.twig", 1);
        yield from $this->parent->unwrap()->yield($context, array_merge($this->blocks, $blocks));
        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

    }

    // line 3
    /**
     * @return iterable<null|scalar|\Stringable>
     */
    public function block_title(array $context, array $blocks = []): iterable
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "title"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "title"));

        yield "Jeu";
        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

        yield from [];
    }

    // line 5
    /**
     * @return iterable<null|scalar|\Stringable>
     */
    public function block_body(array $context, array $blocks = []): iterable
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "body"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "body"));

        // line 6
        yield "    <a id=\"flecheArriere\" href=\"";
        yield $this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getPath("app_games");
        yield "\">◄</a>
    <div class=\"detailJeu\">
        <div class=\"detailJeuBase\">
            <div class=\"detailJeuBase1\">
                <img src=\"";
        // line 10
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, (isset($context["jeu"]) || array_key_exists("jeu", $context) ? $context["jeu"] : (function () { throw new RuntimeError('Variable "jeu" does not exist.', 10, $this->source); })()), "getImage", [], "method", false, false, false, 10), "html", null, true);
        yield "\" alt=\"\">
            </div>
            <div class=\"detailJeuBase2\">
                <h2>";
        // line 13
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, (isset($context["jeu"]) || array_key_exists("jeu", $context) ? $context["jeu"] : (function () { throw new RuntimeError('Variable "jeu" does not exist.', 13, $this->source); })()), "getNom", [], "method", false, false, false, 13), "html", null, true);
        yield "</h2>
                <p class=\"detailP\">Âge Minimum : ";
        // line 14
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, (isset($context["jeu"]) || array_key_exists("jeu", $context) ? $context["jeu"] : (function () { throw new RuntimeError('Variable "jeu" does not exist.', 14, $this->source); })()), "getAge", [], "method", false, false, false, 14), "html", null, true);
        yield "</p>
                <p class=\"detailP\">Date de sortie : ";
        // line 15
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, (isset($context["jeu"]) || array_key_exists("jeu", $context) ? $context["jeu"] : (function () { throw new RuntimeError('Variable "jeu" does not exist.', 15, $this->source); })()), "getDate", [], "method", false, false, false, 15), "html", null, true);
        yield "</p>
                <p class=\"detailP\">Nombres de ventes : ";
        // line 16
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, (isset($context["jeu"]) || array_key_exists("jeu", $context) ? $context["jeu"] : (function () { throw new RuntimeError('Variable "jeu" does not exist.', 16, $this->source); })()), "getVentes", [], "method", false, false, false, 16), "html", null, true);
        yield "</p>
            </div>
        </div>
        <div class=\"detailDescription\">
            <p class=\"detailP\">";
        // line 20
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, (isset($context["jeu"]) || array_key_exists("jeu", $context) ? $context["jeu"] : (function () { throw new RuntimeError('Variable "jeu" does not exist.', 20, $this->source); })()), "getDescription", [], "method", false, false, false, 20), "html", null, true);
        yield "</p>
        </div>
    </div>

    <div class=\"detailButtonDiv\">
        <a href=\"";
        // line 25
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getPath("app_createupdategame", ["id" => CoreExtension::getAttribute($this->env, $this->source, (isset($context["jeu"]) || array_key_exists("jeu", $context) ? $context["jeu"] : (function () { throw new RuntimeError('Variable "jeu" does not exist.', 25, $this->source); })()), "id", [], "any", false, false, false, 25)]), "html", null, true);
        yield "\"><button id=\"detailModifierButton\">Modifier le jeu</button></a>
        <form method=\"POST\" action=\"";
        // line 26
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getPath("app_deletegame", ["id" => CoreExtension::getAttribute($this->env, $this->source, (isset($context["jeu"]) || array_key_exists("jeu", $context) ? $context["jeu"] : (function () { throw new RuntimeError('Variable "jeu" does not exist.', 26, $this->source); })()), "id", [], "any", false, false, false, 26)]), "html", null, true);
        yield "\" onsubmit=\"return confirmDelete()\">
            <button type=\"submit\" id=\"detailSupprimerButton\">Supprimer le jeu</button>
        </form>
    </div>
    <script src=\"";
        // line 30
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Symfony\Bridge\Twig\Extension\AssetExtension']->getAssetUrl("script.js"), "html", null, true);
        yield "\" defer></script>
";
        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

        yield from [];
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName(): string
    {
        return "game/game.html.twig";
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
        return array (  152 => 30,  145 => 26,  141 => 25,  133 => 20,  126 => 16,  122 => 15,  118 => 14,  114 => 13,  108 => 10,  100 => 6,  87 => 5,  64 => 3,  41 => 1,);
    }

    public function getSourceContext(): Source
    {
        return new Source("{% extends 'base.html.twig' %}

{% block title %}Jeu{% endblock %}

{% block body %}
    <a id=\"flecheArriere\" href=\"{{ path('app_games')}}\">◄</a>
    <div class=\"detailJeu\">
        <div class=\"detailJeuBase\">
            <div class=\"detailJeuBase1\">
                <img src=\"{{ jeu.getImage() }}\" alt=\"\">
            </div>
            <div class=\"detailJeuBase2\">
                <h2>{{ jeu.getNom() }}</h2>
                <p class=\"detailP\">Âge Minimum : {{ jeu.getAge() }}</p>
                <p class=\"detailP\">Date de sortie : {{ jeu.getDate() }}</p>
                <p class=\"detailP\">Nombres de ventes : {{ jeu.getVentes() }}</p>
            </div>
        </div>
        <div class=\"detailDescription\">
            <p class=\"detailP\">{{ jeu.getDescription() }}</p>
        </div>
    </div>

    <div class=\"detailButtonDiv\">
        <a href=\"{{ path('app_createupdategame', {'id': jeu.id}) }}\"><button id=\"detailModifierButton\">Modifier le jeu</button></a>
        <form method=\"POST\" action=\"{{ path('app_deletegame', {'id': jeu.id}) }}\" onsubmit=\"return confirmDelete()\">
            <button type=\"submit\" id=\"detailSupprimerButton\">Supprimer le jeu</button>
        </form>
    </div>
    <script src=\"{{ asset('script.js') }}\" defer></script>
{% endblock %}", "game/game.html.twig", "/Users/elysabeth/StudioGaming/StudioGaming/templates/game/game.html.twig");
    }
}
