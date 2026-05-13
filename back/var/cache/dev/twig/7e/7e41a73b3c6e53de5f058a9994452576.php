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

/* game/createupdate.html.twig */
class __TwigTemplate_bad868cf1306f0ef8bf54fc96470ede4 extends Template
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
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "game/createupdate.html.twig"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "game/createupdate.html.twig"));

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

        yield "Jeux";
        
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
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape((isset($context["lienback"]) || array_key_exists("lienback", $context) ? $context["lienback"] : (function () { throw new RuntimeError('Variable "lienback" does not exist.', 6, $this->source); })()), "html", null, true);
        yield "\">◄</a>
    <form class=\"formulaire\" action=\"";
        // line 7
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape((isset($context["lien"]) || array_key_exists("lien", $context) ? $context["lien"] : (function () { throw new RuntimeError('Variable "lien" does not exist.', 7, $this->source); })()), "html", null, true);
        yield "\" method=\"POST\" enctype=\"multipart/form-data\">
        <div class=\"inputdiv\">
            <h4>Nom :</h4>
            <input type=\"text\" name=\"nom\" value=\"";
        // line 10
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, (isset($context["jeu"]) || array_key_exists("jeu", $context) ? $context["jeu"] : (function () { throw new RuntimeError('Variable "jeu" does not exist.', 10, $this->source); })()), "getNom", [], "method", false, false, false, 10), "html", null, true);
        yield "\">
            <p class=\"createeditError\">";
        // line 11
        yield (((CoreExtension::getAttribute($this->env, $this->source, ($context["verification"] ?? null), "nom", [], "array", true, true, false, 11) &&  !(null === CoreExtension::getAttribute($this->env, $this->source, (isset($context["verification"]) || array_key_exists("verification", $context) ? $context["verification"] : (function () { throw new RuntimeError('Variable "verification" does not exist.', 11, $this->source); })()), "nom", [], "array", false, false, false, 11)))) ? ($this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, (isset($context["verification"]) || array_key_exists("verification", $context) ? $context["verification"] : (function () { throw new RuntimeError('Variable "verification" does not exist.', 11, $this->source); })()), "nom", [], "array", false, false, false, 11), "html", null, true)) : (""));
        yield "</p>
        </div>
        
        <div class=\"inputdiv\">
            <h4>Description :</h4>
            <textarea name=\"description\">";
        // line 16
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, (isset($context["jeu"]) || array_key_exists("jeu", $context) ? $context["jeu"] : (function () { throw new RuntimeError('Variable "jeu" does not exist.', 16, $this->source); })()), "getDescription", [], "method", false, false, false, 16), "html", null, true);
        yield "</textarea>
            <p class=\"createeditError\">";
        // line 17
        yield (((CoreExtension::getAttribute($this->env, $this->source, ($context["verification"] ?? null), "description", [], "array", true, true, false, 17) &&  !(null === CoreExtension::getAttribute($this->env, $this->source, (isset($context["verification"]) || array_key_exists("verification", $context) ? $context["verification"] : (function () { throw new RuntimeError('Variable "verification" does not exist.', 17, $this->source); })()), "description", [], "array", false, false, false, 17)))) ? ($this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, (isset($context["verification"]) || array_key_exists("verification", $context) ? $context["verification"] : (function () { throw new RuntimeError('Variable "verification" does not exist.', 17, $this->source); })()), "description", [], "array", false, false, false, 17), "html", null, true)) : (""));
        yield "</p>
        </div>
        
        <div class=\"inputdiv\">
            <h4>Âge minimum :</h4>
            <input type=\"number\" name=\"age\" value=\"";
        // line 22
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, (isset($context["jeu"]) || array_key_exists("jeu", $context) ? $context["jeu"] : (function () { throw new RuntimeError('Variable "jeu" does not exist.', 22, $this->source); })()), "getAge", [], "method", false, false, false, 22), "html", null, true);
        yield "\">
            <p class=\"createeditError\">";
        // line 23
        yield (((CoreExtension::getAttribute($this->env, $this->source, ($context["verification"] ?? null), "age", [], "array", true, true, false, 23) &&  !(null === CoreExtension::getAttribute($this->env, $this->source, (isset($context["verification"]) || array_key_exists("verification", $context) ? $context["verification"] : (function () { throw new RuntimeError('Variable "verification" does not exist.', 23, $this->source); })()), "age", [], "array", false, false, false, 23)))) ? ($this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, (isset($context["verification"]) || array_key_exists("verification", $context) ? $context["verification"] : (function () { throw new RuntimeError('Variable "verification" does not exist.', 23, $this->source); })()), "age", [], "array", false, false, false, 23), "html", null, true)) : (""));
        yield "</p>
        </div>

        <div class=\"inputdiv\">
            <h4>Date de sortie :</h4>
            <input type=\"number\" name=\"date\" value=\"";
        // line 28
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, (isset($context["jeu"]) || array_key_exists("jeu", $context) ? $context["jeu"] : (function () { throw new RuntimeError('Variable "jeu" does not exist.', 28, $this->source); })()), "getDate", [], "method", false, false, false, 28), "html", null, true);
        yield "\">
            <p class=\"createeditError\">";
        // line 29
        yield (((CoreExtension::getAttribute($this->env, $this->source, ($context["verification"] ?? null), "date", [], "array", true, true, false, 29) &&  !(null === CoreExtension::getAttribute($this->env, $this->source, (isset($context["verification"]) || array_key_exists("verification", $context) ? $context["verification"] : (function () { throw new RuntimeError('Variable "verification" does not exist.', 29, $this->source); })()), "date", [], "array", false, false, false, 29)))) ? ($this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, (isset($context["verification"]) || array_key_exists("verification", $context) ? $context["verification"] : (function () { throw new RuntimeError('Variable "verification" does not exist.', 29, $this->source); })()), "date", [], "array", false, false, false, 29), "html", null, true)) : (""));
        yield "</p>
        </div>

        <div class=\"inputdiv\">
            <h4>Nombre de ventes :</h4>
            <input type=\"number\" name=\"ventes\" value=\"";
        // line 34
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, (isset($context["jeu"]) || array_key_exists("jeu", $context) ? $context["jeu"] : (function () { throw new RuntimeError('Variable "jeu" does not exist.', 34, $this->source); })()), "getVentes", [], "method", false, false, false, 34), "html", null, true);
        yield "\">
            <p class=\"createeditError\">";
        // line 35
        yield (((CoreExtension::getAttribute($this->env, $this->source, ($context["verification"] ?? null), "ventes", [], "array", true, true, false, 35) &&  !(null === CoreExtension::getAttribute($this->env, $this->source, (isset($context["verification"]) || array_key_exists("verification", $context) ? $context["verification"] : (function () { throw new RuntimeError('Variable "verification" does not exist.', 35, $this->source); })()), "ventes", [], "array", false, false, false, 35)))) ? ($this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, (isset($context["verification"]) || array_key_exists("verification", $context) ? $context["verification"] : (function () { throw new RuntimeError('Variable "verification" does not exist.', 35, $this->source); })()), "ventes", [], "array", false, false, false, 35), "html", null, true)) : (""));
        yield "</p>
        </div>

        <div class=\"inputdiv\">
            <h4>Image :</h4>
            <input id=\"formulaireimage\" type=\"file\" name=\"image\">
            <p class=\"createeditError\">";
        // line 41
        yield (((CoreExtension::getAttribute($this->env, $this->source, ($context["verification"] ?? null), "image", [], "array", true, true, false, 41) &&  !(null === CoreExtension::getAttribute($this->env, $this->source, (isset($context["verification"]) || array_key_exists("verification", $context) ? $context["verification"] : (function () { throw new RuntimeError('Variable "verification" does not exist.', 41, $this->source); })()), "image", [], "array", false, false, false, 41)))) ? ($this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, (isset($context["verification"]) || array_key_exists("verification", $context) ? $context["verification"] : (function () { throw new RuntimeError('Variable "verification" does not exist.', 41, $this->source); })()), "image", [], "array", false, false, false, 41), "html", null, true)) : (""));
        yield "</p>
            <img id=\"formulaireimg\" src=\"";
        // line 42
        yield (((CoreExtension::getAttribute($this->env, $this->source, ($context["jeu"] ?? null), "getImage", [], "method", true, true, false, 42) &&  !(null === CoreExtension::getAttribute($this->env, $this->source, (isset($context["jeu"]) || array_key_exists("jeu", $context) ? $context["jeu"] : (function () { throw new RuntimeError('Variable "jeu" does not exist.', 42, $this->source); })()), "getImage", [], "method", false, false, false, 42)))) ? ($this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, (isset($context["jeu"]) || array_key_exists("jeu", $context) ? $context["jeu"] : (function () { throw new RuntimeError('Variable "jeu" does not exist.', 42, $this->source); })()), "getImage", [], "method", false, false, false, 42), "html", null, true)) : (""));
        yield "\" alt=\"\">
        </div>

        <button type=\"submit\">";
        // line 45
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape((isset($context["btn"]) || array_key_exists("btn", $context) ? $context["btn"] : (function () { throw new RuntimeError('Variable "btn" does not exist.', 45, $this->source); })()), "html", null, true);
        yield "</button>
    </form>

    <script src=\"";
        // line 48
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
        return "game/createupdate.html.twig";
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
        return array (  188 => 48,  182 => 45,  176 => 42,  172 => 41,  163 => 35,  159 => 34,  151 => 29,  147 => 28,  139 => 23,  135 => 22,  127 => 17,  123 => 16,  115 => 11,  111 => 10,  105 => 7,  100 => 6,  87 => 5,  64 => 3,  41 => 1,);
    }

    public function getSourceContext(): Source
    {
        return new Source("{% extends 'base.html.twig' %}

{% block title %}Jeux{% endblock %}

{% block body %}
    <a id=\"flecheArriere\" href=\"{{ lienback }}\">◄</a>
    <form class=\"formulaire\" action=\"{{lien}}\" method=\"POST\" enctype=\"multipart/form-data\">
        <div class=\"inputdiv\">
            <h4>Nom :</h4>
            <input type=\"text\" name=\"nom\" value=\"{{ jeu.getNom() }}\">
            <p class=\"createeditError\">{{ verification[\"nom\"] ?? ''}}</p>
        </div>
        
        <div class=\"inputdiv\">
            <h4>Description :</h4>
            <textarea name=\"description\">{{ jeu.getDescription() }}</textarea>
            <p class=\"createeditError\">{{ verification[\"description\"] ?? '' }}</p>
        </div>
        
        <div class=\"inputdiv\">
            <h4>Âge minimum :</h4>
            <input type=\"number\" name=\"age\" value=\"{{ jeu.getAge() }}\">
            <p class=\"createeditError\">{{ verification[\"age\"] ?? '' }}</p>
        </div>

        <div class=\"inputdiv\">
            <h4>Date de sortie :</h4>
            <input type=\"number\" name=\"date\" value=\"{{ jeu.getDate() }}\">
            <p class=\"createeditError\">{{ verification[\"date\"] ?? '' }}</p>
        </div>

        <div class=\"inputdiv\">
            <h4>Nombre de ventes :</h4>
            <input type=\"number\" name=\"ventes\" value=\"{{ jeu.getVentes() }}\">
            <p class=\"createeditError\">{{ verification[\"ventes\"] ?? '' }}</p>
        </div>

        <div class=\"inputdiv\">
            <h4>Image :</h4>
            <input id=\"formulaireimage\" type=\"file\" name=\"image\">
            <p class=\"createeditError\">{{ verification[\"image\"] ?? '' }}</p>
            <img id=\"formulaireimg\" src=\"{{ jeu.getImage() ?? '' }}\" alt=\"\">
        </div>

        <button type=\"submit\">{{btn}}</button>
    </form>

    <script src=\"{{ asset('script.js') }}\" defer></script>
{% endblock %}", "game/createupdate.html.twig", "/Users/elysabeth/StudioGaming/back/templates/game/createupdate.html.twig");
    }
}
