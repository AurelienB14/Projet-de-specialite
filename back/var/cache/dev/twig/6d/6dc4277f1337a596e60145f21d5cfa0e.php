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

/* setup/index.html.twig */
class __TwigTemplate_4128b62bd95e0538991472fe66083cb8 extends Template
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
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "setup/index.html.twig"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "setup/index.html.twig"));

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

        yield "Les setups de nos setups";
        
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
        yield "
    <h1>Listes des setups de nos utlisateurs</h1>

    <a href=\"/setup/create\">Ajouter un ordinateur</a>

";
        // line 11
        if (Twig\Extension\CoreExtension::testEmpty((isset($context["setups"]) || array_key_exists("setups", $context) ? $context["setups"] : (function () { throw new RuntimeError('Variable "setups" does not exist.', 11, $this->source); })()))) {
            // line 12
            yield "    <p>Aucun ordinateur trouvé.</p>
";
        } else {
            // line 14
            yield "
    <div class=\"setup_list\">
    ";
            // line 16
            $context['_parent'] = $context;
            $context['_seq'] = CoreExtension::ensureTraversable((isset($context["setups"]) || array_key_exists("setups", $context) ? $context["setups"] : (function () { throw new RuntimeError('Variable "setups" does not exist.', 16, $this->source); })()));
            foreach ($context['_seq'] as $context["_key"] => $context["setup"]) {
                // line 17
                yield "
        <div class=\"setup_preview\">
            <p>";
                // line 19
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, $context["setup"], "processeur", [], "any", false, false, false, 19), "html", null, true);
                yield "</p>
            <p>";
                // line 20
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, $context["setup"], "memoire", [], "any", false, false, false, 20), "html", null, true);
                yield " Go RAM</p>
            <p>";
                // line 21
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, $context["setup"], "carteGraphique", [], "any", false, false, false, 21), "html", null, true);
                yield "</p>
            <p>";
                // line 22
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, $context["setup"], "stockage", [], "any", false, false, false, 22), "html", null, true);
                yield " Go</p>

            <div class=\"icons-list\">
                <form method=\"POST\" action=\"/setup/";
                // line 25
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, $context["setup"], "id", [], "any", false, false, false, 25), "html", null, true);
                yield "/delete\">
                    <input type=\"hidden\" name=\"_method\" value=\"DELETE\">
                    <button type=\"submit\" class=\"btn-hidden\"><i data-lucide=\"trash-2\" class=\"setup-icon\"></i></button>
                </form>
                <a href=\"/setup/";
                // line 29
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, $context["setup"], "id", [], "any", false, false, false, 29), "html", null, true);
                yield "/edit\"><i data-lucide=\"pencil\" class=\"setup-icon\"></i></a>
            </div>
            <a href=\"/setup/";
                // line 31
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, $context["setup"], "id", [], "any", false, false, false, 31), "html", null, true);
                yield "\">Voir la composition</a>
        </div>

    ";
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_key'], $context['setup'], $context['_parent']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 35
            yield "    </div>
";
        }
        // line 37
        yield "
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
        return "setup/index.html.twig";
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
        return array (  169 => 37,  165 => 35,  155 => 31,  150 => 29,  143 => 25,  137 => 22,  133 => 21,  129 => 20,  125 => 19,  121 => 17,  117 => 16,  113 => 14,  109 => 12,  107 => 11,  100 => 6,  87 => 5,  64 => 3,  41 => 1,);
    }

    public function getSourceContext(): Source
    {
        return new Source("{% extends 'base.html.twig' %}

{% block title %}Les setups de nos setups{% endblock %}

{% block body %}

    <h1>Listes des setups de nos utlisateurs</h1>

    <a href=\"/setup/create\">Ajouter un ordinateur</a>

{% if setups is empty %}
    <p>Aucun ordinateur trouvé.</p>
{% else %}

    <div class=\"setup_list\">
    {% for setup in setups %}

        <div class=\"setup_preview\">
            <p>{{ setup.processeur }}</p>
            <p>{{ setup.memoire }} Go RAM</p>
            <p>{{ setup.carteGraphique }}</p>
            <p>{{ setup.stockage }} Go</p>

            <div class=\"icons-list\">
                <form method=\"POST\" action=\"/setup/{{ setup.id }}/delete\">
                    <input type=\"hidden\" name=\"_method\" value=\"DELETE\">
                    <button type=\"submit\" class=\"btn-hidden\"><i data-lucide=\"trash-2\" class=\"setup-icon\"></i></button>
                </form>
                <a href=\"/setup/{{ setup.id }}/edit\"><i data-lucide=\"pencil\" class=\"setup-icon\"></i></a>
            </div>
            <a href=\"/setup/{{ setup.id }}\">Voir la composition</a>
        </div>

    {% endfor %}
    </div>
{% endif %}

{% endblock %}", "setup/index.html.twig", "C:\\Users\\jimmy\\OneDrive\\Documents\\DevCode\\Jeuxverifnote\\api\\Projet-de-specialite\\back\\templates\\setup\\index.html.twig");
    }
}
