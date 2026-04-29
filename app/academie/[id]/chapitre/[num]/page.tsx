'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { use } from 'react'

const chapitres: Record<string, any> = {
  "1": {
    numero: 1,
    titre: "Introduction aux fondements de l'IA",
    contenu: `L'Intelligence Artificielle (IA) est un domaine de l'informatique qui vise à créer des systèmes capables d'effectuer des tâches qui nécessitent normalement l'intelligence humaine. Ces tâches incluent la reconnaissance vocale, la prise de décision, la traduction de langues et la reconnaissance visuelle.

L'histoire de l'IA remonte aux années 1950, lorsque le mathématicien Alan Turing a posé la question fondamentale : "Les machines peuvent-elles penser ?" Son célèbre test de Turing, proposé en 1950, est devenu un critère de référence pour évaluer l'intelligence des machines.

Aujourd'hui, l'IA est partout autour de nous. Quand tu parles à Siri ou Alexa, quand Netflix te recommande un film, quand Gmail détecte un spam — c'est de l'IA. Ces systèmes apprennent à partir de données massives pour améliorer leurs performances au fil du temps.

Il existe deux grandes catégories d'IA : l'IA étroite (ou faible) qui excelle dans une tâche spécifique, et l'IA générale (ou forte) qui pourrait réaliser n'importe quelle tâche intellectuelle humaine. Aujourd'hui, toutes les IA existantes sont des IA étroites.

Le machine learning est la branche la plus importante de l'IA moderne. Au lieu d'être programmé avec des règles fixes, un système de machine learning apprend automatiquement à partir d'exemples. C'est comme apprendre à reconnaître un chat en ayant vu des milliers de photos de chats.`,
    points_cles: [
      "L'IA simule l'intelligence humaine dans des machines",
      "Alan Turing a posé les bases théoriques en 1950",
      "L'IA étroite vs l'IA générale",
      "Le machine learning apprend à partir de données"
    ],
    exemple_concret: "Netflix analyse ton historique de visionnage pour te recommander des films. C'est un algorithme de machine learning qui a appris les préférences de millions d'utilisateurs.",
    anecdote: "En 1997, le superordinateur Deep Blue d'IBM a battu le champion du monde d'échecs Garry Kasparov. C'était la première fois qu'une machine battait un champion humain dans un jeu aussi complexe.",
    quiz: [
      {
        question: "Qui a posé les bases théoriques de l'IA avec son célèbre test ?",
        options: ["Albert Einstein", "Alan Turing", "John McCarthy", "Nikola Tesla"],
        bonne_reponse: "Alan Turing",
        explication: "Alan Turing a proposé en 1950 le 'Test de Turing' pour évaluer si une machine peut exhiber un comportement intelligent indiscernable de celui d'un humain."
      },
      {
        question: "Quelle est la différence principale entre l'IA étroite et l'IA générale ?",
        options: ["L'IA étroite est plus rapide", "L'IA étroite excelle dans une tâche spécifique", "L'IA générale coûte moins cher", "Il n'y a aucune différence"],
        bonne_reponse: "L'IA étroite excelle dans une tâche spécifique",
        explication: "L'IA étroite est conçue pour une tâche précise. L'IA générale pourrait accomplir n'importe quelle tâche intellectuelle humaine — elle n'existe pas encore."
      }
    ],
    exercice: {
      enonce: "Identifie 3 exemples d'IA dans ta vie quotidienne",
      instructions: ["Ouvre ton téléphone ou ordinateur", "Liste 3 applications ou services que tu utilises régulièrement", "Pour chacun, explique quelle tâche l'IA accomplit", "Détermine si c'est de l'IA étroite ou générale"],
      livrable: "Un document texte avec tes 3 exemples et leurs explications",
      conseil: "Pense aux applications de streaming, aux assistants vocaux, aux réseaux sociaux ou aux moteurs de recherche."
    }
  },

  "2": {
    numero: 2,
    titre: "Types d'IA : faible, forte et superintelligence",
    contenu: `Il existe plusieurs façons de classifier l'intelligence artificielle. La classification la plus courante distingue trois niveaux : l'IA faible (ou étroite), l'IA forte (ou générale), et la superintelligence artificielle.

L'IA faible, aussi appelée IA étroite, est la seule forme d'IA qui existe aujourd'hui. Elle est conçue pour accomplir une tâche très spécifique et ne peut pas sortir de ce cadre. Un système de reconnaissance faciale ne peut pas jouer aux échecs, et un moteur de recommandation ne peut pas conduire une voiture. Chaque IA faible est une spécialiste dans son domaine.

L'IA forte, ou Intelligence Artificielle Générale (AGI), est une IA hypothétique qui pourrait accomplir n'importe quelle tâche intellectuelle qu'un humain peut réaliser. Elle pourrait apprendre, raisonner, planifier et résoudre des problèmes dans n'importe quel domaine. Aucun système de ce type n'existe encore, mais c'est l'objectif à long terme de nombreux laboratoires de recherche.

La superintelligence artificielle (ASI) va encore plus loin — c'est une IA qui surpasserait l'intelligence humaine dans tous les domaines. C'est le sujet de nombreux débats philosophiques et éthiques. Des penseurs comme Nick Bostrom ont exploré les risques potentiels d'une telle technologie.

Une autre classification importante distingue l'IA symbolique et l'IA connexionniste. L'IA symbolique utilise des règles logiques explicites programmées par des humains. L'IA connexionniste, comme les réseaux de neurones, apprend à partir de données sans règles explicites — c'est l'approche dominante aujourd'hui.`,
    points_cles: [
      "L'IA faible excelle dans une seule tâche — c'est la seule qui existe",
      "L'IA forte (AGI) pourrait tout faire comme un humain — pas encore réalisée",
      "La superintelligence dépasserait l'humain dans tous les domaines",
      "IA symbolique (règles) vs connexionniste (apprentissage)"
    ],
    exemple_concret: "ChatGPT, AlphaGo, les voitures autonomes — tous sont des IA faibles. ChatGPT génère du texte mais ne peut pas conduire une voiture. AlphaGo joue aux jeux de plateau mais ne peut pas écrire un poème.",
    anecdote: "En 2017, AlphaGo Zero de DeepMind a appris le jeu de Go de zéro, sans aucune connaissance humaine, en jouant contre lui-même. En 3 jours, il surpassait tous les joueurs humains. En 40 jours, il battait la version précédente d'AlphaGo 100-0.",
    quiz: [
      {
        question: "Quelle forme d'IA existe réellement aujourd'hui ?",
        options: ["La superintelligence", "L'IA forte (AGI)", "L'IA faible (étroite)", "L'IA consciente"],
        bonne_reponse: "L'IA faible (étroite)",
        explication: "Toutes les IA actuelles — ChatGPT, systèmes de reconnaissance faciale, voitures autonomes — sont des IA faibles. Elles excellent dans une tâche spécifique mais ne peuvent pas généraliser à d'autres domaines."
      },
      {
        question: "Qu'est-ce que l'AGI ?",
        options: ["Un algorithme de Google", "Une IA qui peut accomplir n'importe quelle tâche intellectuelle humaine", "Un type de réseau de neurones", "Un langage de programmation IA"],
        bonne_reponse: "Une IA qui peut accomplir n'importe quelle tâche intellectuelle humaine",
        explication: "L'AGI (Artificial General Intelligence) est une IA hypothétique capable de raisonner, apprendre et résoudre des problèmes dans n'importe quel domaine, comme un humain. Elle n'existe pas encore."
      }
    ],
    exercice: {
      enonce: "Classe 5 systèmes IA selon leur type",
      instructions: ["Liste ces 5 systèmes : ChatGPT, AlphaGo, Siri, Tesla Autopilot, un robot chirurgical", "Pour chacun, identifie s'il est IA faible, forte ou superintelligence", "Explique en une phrase pourquoi tu as fait ce choix", "Recherche un exemple supplémentaire de ton choix"],
      livrable: "Un tableau avec les 5 systèmes, leur type et ta justification",
      conseil: "Tous les systèmes actuels sont des IA faibles — la question est de comprendre pourquoi chacun est limité à sa tâche."
    }
  },

  "3": {
    numero: 3,
    titre: "Outils et bibliothèques : TensorFlow, PyTorch",
    contenu: `Pour construire des systèmes d'IA, les développeurs utilisent des bibliothèques spécialisées qui simplifient considérablement le travail. Les deux plus populaires sont TensorFlow (développé par Google) et PyTorch (développé par Meta/Facebook).

TensorFlow est une bibliothèque open-source créée par Google en 2015. Elle est particulièrement adaptée à la production — c'est-à-dire déployer des modèles IA dans des applications réelles. TensorFlow est utilisé par des entreprises comme Airbnb, Twitter et Uber pour faire tourner leurs systèmes IA à grande échelle.

PyTorch, développé par Meta en 2016, est devenu le favori de la communauté de recherche. Sa syntaxe est plus intuitive et proche de Python standard, ce qui le rend plus facile à déboguer et à expérimenter. La majorité des recherches en IA publiées aujourd'hui utilisent PyTorch.

Keras est une interface de haut niveau qui fonctionne au-dessus de TensorFlow. Elle simplifie encore plus la création de modèles — idéale pour les débutants. Avec Keras, tu peux créer un réseau de neurones en quelques lignes de code seulement.

Scikit-learn est une autre bibliothèque essentielle pour le machine learning classique. Elle contient des centaines d'algorithmes prêts à l'emploi — arbres de décision, forêts aléatoires, machines à vecteurs de support — et est idéale pour commencer avant de passer aux réseaux de neurones profonds.`,
    points_cles: [
      "TensorFlow (Google) — idéal pour la production et le déploiement",
      "PyTorch (Meta) — favori de la recherche, plus intuitif",
      "Keras — interface simplifiée au-dessus de TensorFlow",
      "Scikit-learn — machine learning classique, parfait pour débuter"
    ],
    exemple_concret: "Instagram utilise PyTorch pour détecter les contenus inappropriés dans les photos. Google utilise TensorFlow pour améliorer les traductions dans Google Translate. Les deux font tourner des millions de prédictions par seconde.",
    anecdote: "PyTorch a été initialement créé en 2016 par une petite équipe chez Facebook AI Research (FAIR). En moins de 5 ans, il est devenu la bibliothèque dominante dans la recherche en IA, dépassant TensorFlow qui avait pourtant 2 ans d'avance.",
    quiz: [
      {
        question: "Quelle bibliothèque est développée par Google et privilégiée pour la production ?",
        options: ["PyTorch", "Scikit-learn", "TensorFlow", "Keras"],
        bonne_reponse: "TensorFlow",
        explication: "TensorFlow a été développé par Google en 2015 et est particulièrement adapté au déploiement en production à grande échelle. Des entreprises comme Uber et Airbnb l'utilisent pour leurs systèmes IA."
      },
      {
        question: "Quelle bibliothèque est recommandée pour un débutant qui veut faire du machine learning classique ?",
        options: ["TensorFlow", "PyTorch", "Scikit-learn", "CUDA"],
        bonne_reponse: "Scikit-learn",
        explication: "Scikit-learn est la bibliothèque idéale pour débuter en machine learning. Elle contient des algorithmes prêts à l'emploi avec une syntaxe simple et une excellente documentation."
      }
    ],
    exercice: {
      enonce: "Installe et teste ta première bibliothèque IA",
      instructions: ["Ouvre ton terminal", "Tape : pip install scikit-learn numpy pandas", "Crée un fichier test.py", "Colle ce code : from sklearn.datasets import load_iris; data = load_iris(); print(data.feature_names)", "Lance avec : python test.py et observe le résultat"],
      livrable: "Une capture d'écran du résultat dans ton terminal",
      conseil: "Si tu as une erreur 'pip not found', utilise 'pip3' à la place. Si scikit-learn est déjà installé, tu verras un message 'already satisfied'."
    }
  },

  "4": {
    numero: 4,
    titre: "Apprentissage automatique et deep learning",
    contenu: `Le machine learning (apprentissage automatique) est une sous-branche de l'IA qui permet aux machines d'apprendre à partir de données sans être explicitement programmées. Au lieu de suivre des règles fixes, un modèle de machine learning identifie des patterns dans les données et améliore ses performances avec l'expérience.

Il existe trois types principaux d'apprentissage automatique. L'apprentissage supervisé utilise des données étiquetées — des exemples avec les bonnes réponses — pour entraîner le modèle. C'est comme apprendre à un enfant à reconnaître des animaux en lui montrant des photos étiquetées "chat", "chien", "oiseau".

L'apprentissage non supervisé travaille avec des données non étiquetées. Le modèle doit trouver lui-même des structures cachées dans les données. C'est utilisé pour le clustering — regrouper des clients par comportement d'achat, par exemple.

L'apprentissage par renforcement est différent — l'agent apprend en interagissant avec un environnement et en recevant des récompenses ou des punitions. C'est ainsi qu'AlphaGo a appris à jouer au Go, et comment les robots apprennent à marcher.

Le deep learning est une sous-branche du machine learning basée sur les réseaux de neurones artificiels à plusieurs couches. Ces réseaux s'inspirent du cerveau humain — des neurones artificiels connectés qui traitent l'information en couches successives. Le deep learning est responsable des grandes avancées récentes en reconnaissance d'images, traduction automatique et génération de texte.`,
    points_cles: [
      "Machine learning : les machines apprennent à partir de données",
      "Apprentissage supervisé — données étiquetées",
      "Apprentissage non supervisé — trouver des patterns cachés",
      "Deep learning — réseaux de neurones profonds"
    ],
    exemple_concret: "Le filtre spam de Gmail utilise l'apprentissage supervisé — il a été entraîné sur des millions d'emails étiquetés 'spam' ou 'pas spam'. Aujourd'hui il détecte 99,9% des spams automatiquement.",
    anecdote: "En 2012, un réseau de neurones profond appelé AlexNet a remporté le concours ImageNet avec une précision de 85% — surpassant tous les autres algorithmes de 10 points. C'est ce moment qui a déclenché la révolution du deep learning que nous vivons aujourd'hui.",
    quiz: [
      {
        question: "Quel type d'apprentissage utilise des données avec les bonnes réponses déjà connues ?",
        options: ["Apprentissage par renforcement", "Apprentissage non supervisé", "Apprentissage supervisé", "Apprentissage profond"],
        bonne_reponse: "Apprentissage supervisé",
        explication: "L'apprentissage supervisé utilise des données étiquetées — on fournit au modèle des exemples avec les bonnes réponses pour qu'il apprenne à généraliser."
      },
      {
        question: "Sur quoi s'inspirent les réseaux de neurones artificiels ?",
        options: ["Les circuits électroniques", "Le cerveau humain", "Les algorithmes de tri", "Les bases de données"],
        bonne_reponse: "Le cerveau humain",
        explication: "Les réseaux de neurones artificiels s'inspirent du fonctionnement du cerveau humain — des neurones interconnectés qui transmettent des signaux et apprennent par l'expérience."
      }
    ],
    exercice: {
      enonce: "Entraîne ton premier modèle de machine learning",
      instructions: [
        "Crée un fichier premier_modele.py",
        "Colle ce code :\nfrom sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.tree import DecisionTreeClassifier\ndata = load_iris()\nX_train, X_test, y_train, y_test = train_test_split(data.data, data.target, test_size=0.2)\nmodele = DecisionTreeClassifier()\nmodele.fit(X_train, y_train)\nprint(f'Précision : {modele.score(X_test, y_test)*100:.1f}%')",
        "Lance avec : python premier_modele.py",
        "Observe la précision obtenue"
      ],
      livrable: "La précision de ton modèle affichée dans le terminal",
      conseil: "Une précision entre 85% et 100% est normale. Si tu obtiens moins, relance — le découpage train/test est aléatoire."
    }
  },

  "5": {
    numero: 5,
    titre: "Applications pratiques de l'IA",
    contenu: `L'intelligence artificielle transforme aujourd'hui presque tous les secteurs d'activité. Comprendre ses applications concrètes est essentiel pour anticiper les opportunités professionnelles et les changements sociétaux qui se profilent.

La reconnaissance d'images est l'une des applications les plus matures. Les algorithmes de vision par ordinateur peuvent identifier des objets, des visages, des maladies dans des radiographies, des défauts dans des pièces industrielles. Des applications comme Google Lens peuvent identifier une plante, un monument ou un produit en quelques secondes.

Le traitement du langage naturel (NLP) permet aux machines de comprendre et générer du texte humain. ChatGPT, Google Translate, les chatbots de service client, la correction automatique — toutes ces technologies reposent sur le NLP. Les grands modèles de langage comme GPT-4 peuvent rédiger des textes, coder, traduire et répondre à des questions complexes.

Dans le domaine médical, l'IA révolutionne le diagnostic. Des algorithmes détectent des cancers dans des images médicales avec une précision supérieure à celle des médecins dans certains cas. L'IA aide aussi à découvrir de nouveaux médicaments en simulant des milliards d'interactions moléculaires.

Les véhicules autonomes combinent vision par ordinateur, traitement de données de capteurs et prise de décision en temps réel. Tesla, Waymo et d'autres entreprises développent des systèmes capables de naviguer dans des environnements complexes sans intervention humaine.

L'IA générative — capable de créer du contenu original — est la révolution la plus récente. Elle génère des images (Midjourney, DALL-E), de la musique, du code, des vidéos et du texte de qualité professionnelle, ouvrant de nouvelles possibilités créatives et productives.`,
    points_cles: [
      "Vision par ordinateur — reconnaître images, visages, objets",
      "NLP — comprendre et générer le langage humain",
      "IA médicale — diagnostic et découverte de médicaments",
      "IA générative — créer du contenu original"
    ],
    exemple_concret: "GitHub Copilot utilise un grand modèle de langage pour suggérer du code en temps réel pendant que tu programmes. Il a été entraîné sur des milliards de lignes de code public et aide les développeurs à coder 55% plus vite.",
    anecdote: "En 2020, AlphaFold de DeepMind a résolu le problème du repliement des protéines — un défi scientifique de 50 ans. En quelques semaines, il a prédit la structure de 200 millions de protéines, accélérant potentiellement la recherche médicale de plusieurs décennies.",
    quiz: [
      {
        question: "Quel domaine de l'IA permet aux machines de comprendre et générer du texte ?",
        options: ["La vision par ordinateur", "Le traitement du langage naturel (NLP)", "L'apprentissage par renforcement", "La robotique"],
        bonne_reponse: "Le traitement du langage naturel (NLP)",
        explication: "Le NLP (Natural Language Processing) est la branche de l'IA qui permet aux machines de comprendre, interpréter et générer du langage humain. ChatGPT, Google Translate et les assistants vocaux utilisent le NLP."
      },
      {
        question: "Qu'est-ce que l'IA générative ?",
        options: ["Une IA qui génère de l'électricité", "Une IA capable de créer du contenu original", "Une IA qui gère des bases de données", "Une IA qui programme des robots"],
        bonne_reponse: "Une IA capable de créer du contenu original",
        explication: "L'IA générative crée du contenu nouveau — images, texte, musique, vidéo, code. Midjourney génère des images, ChatGPT génère du texte, GitHub Copilot génère du code."
      }
    ],
    exercice: {
      enonce: "Explore une application IA réelle de ton choix",
      instructions: [
        "Choisis un domaine qui t'intéresse : médecine, art, programmation, musique ou autre",
        "Recherche une application IA concrète dans ce domaine",
        "Identifie quel type d'IA elle utilise (NLP, vision, génératif...)",
        "Explique comment elle fonctionne en termes simples",
        "Donne ton avis : quels sont ses avantages et ses limites ?"
      ],
      livrable: "Un court texte de 10 à 15 lignes présentant l'application choisie",
      conseil: "Choisis quelque chose qui te passionne vraiment — tu apprendras beaucoup mieux en explorant un domaine qui t'intéresse."
    }
  }
}

export default function LecteurCours({ params }: { params: Promise<{ id: string, num: string }> }) {
  const { id, num } = use(params)
  const chapitre = chapitres[num]

  const [quizEtat, setQuizEtat] = useState<Record<number, string>>({})
  const [quizValide, setQuizValide] = useState<Record<number, boolean>>({})
  const [exerciceOuvert, setExerciceOuvert] = useState(false)

  if (!chapitre) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Chapitre introuvable</p>
          <Link href={`/academie/${id}`} className="text-blue-600 hover:underline text-sm">
            Retour au cours
          </Link>
        </div>
      </main>
    )
  }

  const handleReponse = (quizIndex: number, option: string) => {
    if (quizValide[quizIndex]) return
    setQuizEtat(prev => ({ ...prev, [quizIndex]: option }))
  }

  const handleValider = (quizIndex: number) => {
    if (!quizEtat[quizIndex]) return
    setQuizValide(prev => ({ ...prev, [quizIndex]: true }))
  }

  const tousQuizRepondus = chapitre.quiz.every((_: any, i: number) => quizValide[i])

  return (
    <main className="min-h-screen bg-white">

      {/* Barre de progression fixe */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between px-6 py-3">
          <Link href={`/academie/${id}`} className="text-sm text-gray-500 hover:text-blue-600">
            ← Retour au cours
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400">Chapitre {chapitre.numero} / 5</span>
            <div className="w-32 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all"
                style={{ width: `${(chapitre.numero / 5) * 100}%` }}
              />
            </div>
          </div>
          {chapitre.numero < 5 ? (
            <Link
              href={tousQuizRepondus ? `/academie/${id}/chapitre/${chapitre.numero + 1}` : '#'}
              className={`text-sm px-4 py-1.5 rounded-lg transition-colors ${
                tousQuizRepondus
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none'
              }`}
            >
              Chapitre suivant →
            </Link>
          ) : (
            <Link
              href={`/academie/${id}`}
              className="text-sm px-4 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
            >
              Terminer le cours ✓
            </Link>
          )}
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-3xl mx-auto px-6 pt-24 pb-20 space-y-10">

        {/* Titre */}
        <div>
          <span className="text-xs text-blue-600 font-medium uppercase tracking-wider">
            Chapitre {chapitre.numero}
          </span>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">{chapitre.titre}</h1>
        </div>

        {/* Contenu texte */}
        <section>
          {chapitre.contenu.split('\n\n').map((paragraphe: string, i: number) => (
            <p key={i} className="text-gray-700 leading-relaxed mb-4">{paragraphe}</p>
          ))}
        </section>

        {/* Points clés */}
        <section className="bg-blue-50 rounded-2xl p-6">
          <h2 className="font-semibold text-blue-900 mb-4">Points clés à retenir</h2>
          <ul className="space-y-2">
            {chapitre.points_cles.map((point: string, i: number) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">{i + 1}</span>
                </div>
                <span className="text-sm text-blue-800">{point}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Exemple concret */}
        <section className="border-l-4 border-blue-600 pl-6">
          <h2 className="font-semibold text-gray-900 mb-2">Exemple concret</h2>
          <p className="text-gray-600 text-sm leading-relaxed">{chapitre.exemple_concret}</p>
        </section>

        {/* Anecdote */}
        <section className="bg-amber-50 rounded-2xl p-6">
          <h2 className="font-semibold text-amber-900 mb-2">Le savais-tu ?</h2>
          <p className="text-amber-800 text-sm leading-relaxed">{chapitre.anecdote}</p>
        </section>

        {/* Quiz */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quiz — Teste ta compréhension</h2>
          <div className="space-y-8">
            {chapitre.quiz.map((q: any, i: number) => (
              <div key={i} className="border border-gray-100 rounded-2xl p-6">
                <p className="font-medium text-gray-900 mb-4">
                  {i + 1}. {q.question}
                </p>
                <div className="space-y-3">
                  {q.options.map((option: string) => {
                    const selectionne = quizEtat[i] === option
                    const valide = quizValide[i]
                    const estBonne = option === q.bonne_reponse

                    let style = "border border-gray-200 text-gray-700 hover:border-blue-300"
                    if (selectionne && !valide) style = "border-2 border-blue-500 text-blue-700 bg-blue-50"
                    if (valide && estBonne) style = "border-2 border-green-500 text-green-700 bg-green-50"
                    if (valide && selectionne && !estBonne) style = "border-2 border-red-400 text-red-700 bg-red-50"

                    return (
                      <button
                        key={option}
                        onClick={() => handleReponse(i, option)}
                        className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all ${style}`}
                      >
                        {option}
                      </button>
                    )
                  })}
                </div>

                {!quizValide[i] && (
                  <button
                    onClick={() => handleValider(i)}
                    disabled={!quizEtat[i]}
                    className={`mt-4 px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                      quizEtat[i]
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Valider ma réponse
                  </button>
                )}

                {quizValide[i] && (
                  <div className={`mt-4 p-4 rounded-xl text-sm ${
                    quizEtat[i] === q.bonne_reponse
                      ? 'bg-green-50 text-green-800'
                      : 'bg-red-50 text-red-800'
                  }`}>
                    <p className="font-medium mb-1">
                      {quizEtat[i] === q.bonne_reponse ? 'Bonne réponse !' : 'Pas tout à fait...'}
                    </p>
                    <p>{q.explication}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Exercice pratique */}
        <section className="border border-gray-100 rounded-2xl overflow-hidden">
          <button
            onClick={() => setExerciceOuvert(!exerciceOuvert)}
            className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900">Exercice pratique</p>
                <p className="text-xs text-gray-500">{chapitre.exercice.enonce}</p>
              </div>
            </div>
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform ${exerciceOuvert ? 'rotate-180' : ''}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {exerciceOuvert && (
            <div className="px-6 pb-6 border-t border-gray-50">
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Instructions :</p>
                  <ol className="space-y-2">
                    {chapitre.exercice.instructions.map((inst: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                        <span className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-medium text-gray-500">
                          {i + 1}
                        </span>
                        {inst}
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs font-medium text-gray-500 mb-1">Livrable</p>
                  <p className="text-sm text-gray-700">{chapitre.exercice.livrable}</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-xs font-medium text-blue-600 mb-1">Conseil</p>
                  <p className="text-sm text-blue-700">{chapitre.exercice.conseil}</p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Navigation bas */}
        <div className="flex justify-between pt-6 border-t border-gray-100">
          {chapitre.numero > 1 ? (
            <Link
              href={`/academie/${id}/chapitre/${chapitre.numero - 1}`}
              className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
            >
              ← Chapitre précédent
            </Link>
          ) : <div />}

          {chapitre.numero < 5 ? (
            <Link
              href={tousQuizRepondus ? `/academie/${id}/chapitre/${chapitre.numero + 1}` : '#'}
              className={`text-sm px-6 py-2.5 rounded-xl font-medium transition-colors ${
                tousQuizRepondus
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none'
              }`}
            >
              Chapitre suivant →
            </Link>
          ) : (
            <Link
              href={`/academie/${id}`}
              className="text-sm px-6 py-2.5 rounded-xl font-medium bg-green-600 text-white hover:bg-green-700 transition-colors"
            >
              Terminer le cours ✓
            </Link>
          )}
        </div>

      </div>
    </main>
  )
}