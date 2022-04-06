@Library('jenkins-common-library@r0') _

nodestepPipeline {
    // indirizzo a cui mandare la notifica in caso di build sul master
    // (di default solo in caso di fallimento)
    // PARAMETRO OBBLIGATORIO
    notificationAddress = "giuseppe.pennisi@rbtech.dev,fabrizio.fallico@rbtech.dev"

    // se la fase di test genera i report junit specificare qua il percorso
    // e.g. https://www.npmjs.com/package/mocha-junit-reporter
    // junitFiles = '**/build/<...>/*.xml'

    // di default lo step di publish viene eseguito sulla branch master, con
    // questo parametro si può indicare una branch diversa
    // mainBranch = 'prod'

    // possiamo personalizzare il nome del tag di deploy (default produzione)
    deployTag = "stable"
}