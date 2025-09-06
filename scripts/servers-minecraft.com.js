async function vote(first) {
    const voteBtn = document.querySelector('button[data-text-content="Vote"]');

    if (document.querySelector('.alert.alert-success')) {
        chrome.runtime.sendMessage({successfully: true})
    } else if (voteBtn.hasAttribute("data-countdown")) {
        const timeArr = voteBtn.innerHTML.split(/\s+:\s+/)
        const [hours, minutes, seconds] = timeArr.map(Number);

        const totalMs =
            (hours * 60 * 60 * 1000) +
            ((minutes + 10) * 60 * 1000) +
            (seconds * 1000);

        chrome.runtime.sendMessage({later: Date.now() + totalMs})
    }

    if (first) return

    const project = await getProject()

    document.querySelector("input[name='playername']").value = project.nick
    voteBtn.click()
}