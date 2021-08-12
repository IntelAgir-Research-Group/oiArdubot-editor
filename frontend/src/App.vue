<template>
  <div id="app">
    <div id="controls">
      <button id="exec-code" @click="compileToJS">Executar</button>
      <button id="save" @click="saveTextAsFile">Baixar Código OiArduBot</button>
      <button id="ino" @click="downloadArduinoCode">Baixar Código Arduíno</button>
    </div>
    <div class="content">
      <div
        id="xtext-editor"
        :data-editor-xtext-lang="this.dslFileExtenstion"
      ></div>
      <div id="console-view">
        <p>
          <code>
            <pre class="arduinoCode">{{ arduCode }}</pre>
          </code>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { protocol, baseUrl } from "@/services/ConnectionData.js";
import CompilerService from "@/services/CompilerService";

export default {
  name: "App",
  components: {},
  data() {
    return {
      xtextEditor: null,
      scriptContainer: null,
      dslFileExtenstion: "",
      arduCode: "",
    };
  },
  mounted() {
    !window._xtext
      ? window.xtextReadyEvent.on("ready", this.setXtextEditor)
      : this.setXtextEditor();
  },
  methods: {
    setXtextEditor() {
      this.dslFileExtenstion = window._dslFileExtenstion;

      this.$nextTick(() => {
        this.xtextEditor = window._xtext.createEditor({
          baseUrl: "/",
          serviceUrl: `${protocol}${baseUrl}xtext-service`,
          syntaxDefinition: `xtext-resources/generated/mode-${this.dslFileExtenstion}.js`,
          enableCors: true,
        });
      });
    },
    async compileToJS() {
      try {
        const response = await CompilerService.compileCode(
          this.xtextEditor.getValue()
        );
        console.log(response);
        const compiledCode = response.data.code;
        this.runCompiledCode(compiledCode);
      } catch (err) {
        alert(err);
        console.error(err.error);
      }
    },
    runCompiledCode(compiledCode) {
      try {
        console.log(compiledCode);
        this.arduCode = compiledCode;
      } catch (err) {
        console.error(err);
      }
    },
    downloadArduinoCode() {
      var textToWrite = this.arduCode;
      var textFileAsBlob = new Blob([textToWrite], { type: "text/plain" });
      var fileNameToSaveAs = "codigo.ino";

      var downloadLink = document.createElement("a");
      downloadLink.download = fileNameToSaveAs;
      downloadLink.innerHTML = "Download File";
      if (window.webkitURL != null) {
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
      } else {
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
      }

      downloadLink.click();
    },
    saveTextAsFile() {
      var textToWrite = this.xtextEditor.getValue();
      var textFileAsBlob = new Blob([textToWrite], { type: "text/plain" });
      var fileNameToSaveAs = "codigo.oab";

      var downloadLink = document.createElement("a");
      downloadLink.download = fileNameToSaveAs;
      downloadLink.innerHTML = "Download File";
      if (window.webkitURL != null) {
        // Chrome allows the link to be clicked without actually adding it to the DOM.
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
      } else {
        // Firefox requires the link to be added to the DOM before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        // downloadLink.onclick = destroyClickedElement();
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
      }

      downloadLink.click();
    },
  },
};
</script>
<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  align-items: center;
  justify-content: center;
  display: flex;
  width: 100%;
  background-color: #f1f1f1;
}

#app {
  display: flex;
  width: 100%;
  flex-direction: column;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 90%;
  justify-content: center;
  align-items: center;
}

#controls,
.content {
  width: 90%;
}

.content {
  display: flex;
  min-height: 100%;
}

#xtext-editor {
  position: relative;
  height: 100%;
  width: 100%;
  border: 1px solid #2c3e50;
  background-color: #f1f1f1;
}

#console-view {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
  border: 1px solid #aaa;
  background-image: url("./assets/logo-OiArduBot.png");
  background-size: 30%;
  background-repeat: no-repeat;
  background-position: right bottom;
  padding-left: 1em;
  background-color: #2c3e50;
  color: #eee;
}

#save {
  background-color: #10b2d6;
  border: none;
  color: white;
  padding: 8px 30px;
  cursor: pointer;
  font-size: 14px;
  border-radius: 3px;
  margin-bottom: 1em;
  margin-left: 1em;
}

/* Darker background on mouse-over */
#save:hover {
  background-color: #0d9fbf;
}

#ino {
  background-color: #2c3e50;
  border: none;
  color: white;
  padding: 8px 30px;
  cursor: pointer;
  font-size: 14px;
  border-radius: 3px;
  margin-bottom: 1em;
  margin-left: 1em;
}

#ino:hover {
  background-color: #1c2833;
}

#exec-code {
  background-color: #ffe714;
  border: none;
  color: white;
  padding: 8px 30px;
  cursor: pointer;
  font-size: 14px;
  border-radius: 3px;
  margin-bottom: 1em;
}

#exec-code:hover {
  background-color: #e3ce14;
}

.copy-btn {
  padding: 0;
  width: 88px;
  height: 30px;
  line-height: 26px;
  border-radius: 50px;
}
</style>
