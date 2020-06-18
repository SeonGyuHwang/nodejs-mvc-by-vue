<template>
  <div v-if="open">
    <slot />
  </div>
</template>

<script>
  function copyStyles(sourceDoc, targetDoc) {
    Array.from(sourceDoc.styleSheets).forEach(styleSheet => {
      if (styleSheet.cssRules) {
        // for <style> elements
        const newStyleEl = sourceDoc.createElement("style");

        Array.from(styleSheet.cssRules).forEach(cssRule => {
          // write the text of each rule into the body of the style element
          newStyleEl.appendChild(sourceDoc.createTextNode(cssRule.cssText));
        });

        targetDoc.head.appendChild(newStyleEl);
      } else if (styleSheet.href) {
        // for <link> elements loading CSS from a URL
        const newLinkEl = sourceDoc.createElement("link");

        newLinkEl.rel = "stylesheet";
        newLinkEl.href = styleSheet.href;
        targetDoc.head.appendChild(newLinkEl);
      }
    });

  }

  export default {
    name: 'window-portal',
    model: {
      prop: 'open',
      event: 'close'
    },
    props: {
      open: {
        type: Boolean,
        default: false,
      }
    },
    data() {
      return {
        windowRef: null,
        windowSize: {
          width: 0,
          height: 0
        }
      }
    },
    watch: {
      open(newOpen) {
        if(newOpen) {
          this.openPortal();
        } else {
          this.closePortal();
        }
      },
      windowSize: {
        deep: true,
        handler() {
          this.windowRef.removeEventListener('resize', this.resized);
        }
      }
    },
    methods: {
      resized() {
        if( this.windowSize.width === 0 && this.windowSize.height === 0 ) {
          this.windowSize.width = this.windowRef.document.querySelector('div').getClientRects()[0].width
          this.windowSize.height = this.windowRef.document.querySelector('div').getClientRects()[0].height
        }

        this.windowRef.resizeTo(this.windowSize.width, this.windowSize.height+85)
      },
      openPortal() {
        this.windowRef = window.open("", "", "width=768,height=593,left=200,top=200");
        this.windowRef.document.body.appendChild(this.$el);
        copyStyles(window.document, this.windowRef.document);
        this.windowRef.document.title = 'Popup'
        this.windowRef.addEventListener('beforeunload', this.closePortal);
        this.windowRef.addEventListener('resize', this.resized);
      },
      closePortal() {
        if(this.windowRef) {
          this.windowRef.close();
          this.windowRef = null;
          this.$emit('close');
        }
      }
    },
    mounted() {
      if(this.open) {
        this.openPortal();
      }
    },
    beforeDestroy() {
      if (this.windowRef) {
        this.closePortal();
      }

      this.windowSize.width = 0
      this.windowSize.height = 0
    }
  }
</script>
