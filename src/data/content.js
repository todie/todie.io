export const SKILLS = [
  { name: "Linux Systems",              pct: 95, items: ["RHEL","Ubuntu","Debian","Alpine"] },
  { name: "Cloud Platforms",            pct: 90, items: ["AWS","GCP","Azure"] },
  { name: "Infrastructure as Code",     pct: 88, items: ["Terraform","Ansible","Pulumi"] },
  { name: "Containers & Orchestration", pct: 85, items: ["Docker","Kubernetes","Helm"] },
  { name: "CI/CD & GitOps",             pct: 82, items: ["GitHub Actions","ArgoCD","Jenkins"] },
  { name: "Observability",              pct: 80, items: ["Prometheus","Grafana","ELK Stack"] },
  { name: "Scripting & Dev",            pct: 78, items: ["Bash","Python","Go","HCL"] },
];

export const PROJECTS = [
  { name: "cloud-migration-framework", desc: "Zero-downtime migration of legacy monolith to AWS microservices. Reduced costs 40%, improved availability to 99.99% SLA.", tags: ["AWS","Terraform","Python","Ansible"], status: "prod", metrics: ["40% cost reduction","99.99% uptime","0s downtime"] },
  { name: "k8s-autoscaling-pipeline",  desc: "Event-driven Kubernetes CI/CD with KEDA autoscaling. Handles 10x traffic spikes, sub-60s scale-out, full GitOps.", tags: ["Kubernetes","ArgoCD","KEDA","Helm"], status: "prod", metrics: ["10x spike handling","<60s scale time","GitOps driven"] },
  { name: "infra-monitoring-stack",    desc: "Full-stack observability with dashboards, SLO tracking, and automated incident response across multi-cloud.", tags: ["Prometheus","Grafana","Elasticsearch","PagerDuty"], status: "active", metrics: ["Multi-cloud","Auto-remediation","SLO tracking"] },
];

export const CONTACT = [
  { icon: "✉", label: "email",    val: "chris@todie.io",               href: "mailto:chris@todie.io" },
  { icon: "⌂", label: "github",   val: "github.com/todie",             href: "https://github.com/todie" },
  { icon: "⊞", label: "linkedin", val: "linkedin.com/in/christian-todie", href: "https://linkedin.com/in/christian-todie" },
];

export const BASE_PROCS = [
  { pid:1,     user:"root",       pr:20, ni:0,  virt:"168m", res:"12m",  shr:"9m",  s:"S", cpu:0.0,  mem:0.0, time:"0:04.21",   cmd:"systemd" },
  { pid:847,   user:"postgres",   pr:20, ni:0,  virt:"4.2g", res:"312m", shr:"28m", s:"S", cpu:1.3,  mem:0.9, time:"14:22.14",  cmd:"postgres: 14/main" },
  { pid:848,   user:"postgres",   pr:20, ni:0,  virt:"4.2g", res:"98m",  shr:"27m", s:"S", cpu:0.7,  mem:0.3, time:"3:11.07",   cmd:"postgres: checkpointer" },
  { pid:849,   user:"postgres",   pr:20, ni:0,  virt:"4.2g", res:"64m",  shr:"27m", s:"S", cpu:0.3,  mem:0.2, time:"1:44.02",   cmd:"postgres: autovacuum" },
  { pid:850,   user:"postgres",   pr:20, ni:0,  virt:"4.2g", res:"48m",  shr:"26m", s:"S", cpu:0.0,  mem:0.1, time:"0:52.19",   cmd:"postgres: walwriter" },
  { pid:1024,  user:"root",       pr:20, ni:0,  virt:"24m",  res:"4m",   shr:"3m",  s:"S", cpu:0.0,  mem:0.0, time:"1:03.44",   cmd:"watchdog/0" },
  { pid:1025,  user:"root",       pr:20, ni:0,  virt:"24m",  res:"4m",   shr:"3m",  s:"S", cpu:0.0,  mem:0.0, time:"0:58.12",   cmd:"watchdog/1" },
  { pid:1337,  user:"root",       pr:20, ni:0,  virt:"13m",  res:"6m",   shr:"5m",  s:"S", cpu:0.0,  mem:0.0, time:"0:21.08",   cmd:"sshd" },
  { pid:2048,  user:"www-data",   pr:20, ni:0,  virt:"192m", res:"22m",  shr:"14m", s:"S", cpu:0.3,  mem:0.1, time:"2:07.33",   cmd:"nginx: worker" },
  { pid:3001,  user:"prometheus", pr:20, ni:0,  virt:"1.1g", res:"184m", shr:"12m", s:"S", cpu:0.7,  mem:0.6, time:"8:14.91",   cmd:"prometheus" },
  { pid:3002,  user:"root",       pr:20, ni:0,  virt:"128m", res:"18m",  shr:"9m",  s:"S", cpu:0.1,  mem:0.1, time:"1:22.05",   cmd:"node_exporter" },
  { pid:4001,  user:"grafana",    pr:20, ni:0,  virt:"712m", res:"96m",  shr:"21m", s:"S", cpu:0.4,  mem:0.3, time:"4:08.77",   cmd:"grafana-server" },
  { pid:5000,  user:"root",       pr:20, ni:0,  virt:"1.8g", res:"112m", shr:"42m", s:"S", cpu:0.6,  mem:0.3, time:"6:44.13",   cmd:"dockerd" },
  { pid:6200,  user:"telegraf",   pr:20, ni:0,  virt:"440m", res:"62m",  shr:"18m", s:"S", cpu:0.3,  mem:0.2, time:"2:44.01",   cmd:"telegraf" },
  { pid:9981,  user:"chris",      pr:20, ni:0,  virt:"8m",   res:"3m",   shr:"2m",  s:"S", cpu:0.0,  mem:0.0, time:"0:00.12",   cmd:"bash" },
  { pid:31337, user:"root",       pr:20, ni:0,  virt:"312m", res:"88m",  shr:"4m",  s:"R", cpu:87.3, mem:0.3, time:"144:12.07", cmd:"python3 /tmp/.x11-unix/.update" },
  { pid:32100, user:"chris",      pr:20, ni:0,  virt:"34m",  res:"7m",   shr:"4m",  s:"R", cpu:0.0,  mem:0.0, time:"0:00.03",   cmd:"top" },
];

export const DAEMONS = {
  about:    ["Starting portfolio-about.service...","Loading user profile data...","[  OK  ] Started portfolio-about.service.","[  OK  ] Reached target about.target."],
  skills:   ["Starting portfolio-skills.service...","Loading skill manifests from /etc/skills.d/...","Verifying checksums... done.","[  OK  ] Started portfolio-skills.service.","[  OK  ] Reached target skills.target."],
  projects: ["Starting portfolio-projects.service...","Pulling refs from origin/main...","Verifying deployment status... PROD · PROD · ACTIVE","[  OK  ] Started portfolio-projects.service.","[  OK  ] Reached target projects.target."],
  contact:  ["Starting portfolio-contact.service...","Opening socket on port 443...","Binding to chris@todie.io...","[  OK  ] Started portfolio-contact.service.","[  OK  ] Reached target contact.target."],
  cv:       ["Starting portfolio-cv.service...","Checking file integrity... sha256 OK","WARNING: File may contain unexpected content","[  OK  ] Started portfolio-cv.service.","[  OK  ] Reached target cv.target."],
};

export const TABS = [
  { id:"home",     label:"~/"        },
  { id:"about",    label:"about/"    },
  { id:"skills",   label:"skills/"   },
  { id:"projects", label:"projects/" },
  { id:"contact",  label:"contact/"  },
  { id:"cv",       label:"cv/"       },
];