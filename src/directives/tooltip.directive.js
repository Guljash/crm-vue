export default {
    beforeMount(el, { value }) {
        console.log(el);
        window.M.Tooltip.init(el, { html: value })
    },
    unmounted(el,) {
        const tooltip = window.M.Tooltip.getInstance(el)
        if (tooltip && tooltip.destroy) {
            tooltip.destroy()
        }
    }
}