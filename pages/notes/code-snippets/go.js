import CodeSnippetPost from 'components/CodeSnippetPost'
import CodeBlock from 'components/CodeBlock'
import CodeSnippet from 'components/CodeSnippet'

export default function GoCodeSnippets() {
  return (
    <CodeSnippetPost
      title="Go Code Snippets"
      description="Useful bites of Go code that I often write and rewrite.">
      <CodeSnippet title="Static File Server">
        <p>
          A simple static file server that binds to localhost. Use{' '}
          <code>--port</code> (<code>-p</code>) to specify the port and{' '}
          <code>--dir</code> (<code>-d</code>) to specify the directory,
          otherwise it'll default to port 3000 and the current working
          directory, respectively.
        </p>
        <CodeBlock lang="go">{`
package main

import (
	"fmt"
	"flag"
	"log"
	"os"
	"net/http"
	"path/filepath"
)

const (
	DEFAULT_PORT = 3000
	DEFAULT_STATIC_DIRECTORY = "."
)

func main() {
	var port int
	var staticDirectory string
	flag.IntVar(&port, "port", DEFAULT_PORT, "the port to which the server will bind")
	flag.IntVar(&port, "p", DEFAULT_PORT, "the port to which the server will bind")
	flag.StringVar(&staticDirectory, "dir", DEFAULT_STATIC_DIRECTORY, "the directory that will be served")
	flag.StringVar(&staticDirectory, "d", DEFAULT_STATIC_DIRECTORY, "the directory that will be served")
	flag.Parse()

	workingDir, err := os.Getwd()
	if err != nil {
		log.Fatal(err)
	}

	fs := http.FileServer(http.Dir(filepath.Join(workingDir, staticDirectory)))
	http.Handle("/", fs)

	fmt.Printf("Listening on http://localhost:%d\n", port)
	err = http.ListenAndServe(fmt.Sprintf(":%d", port), nil)
	if err != nil {
		log.Fatal(err)
	}
}
`}</CodeBlock>
      </CodeSnippet>
      <CodeSnippet title="Parse a SQL Connection URI">
        <p>
          A function for easily converting a SQL connection URI to a flavor and
          connection details that can be passed directly into Go's{' '}
          <a href="https://pkg.go.dev/database/sql#Open" target="_blank">
            sql.Open()
          </a>{' '}
          function.
        </p>
        <CodeBlock lang="go">{`
package main

import (
	"fmt"
	"net"
	"net/url"
	"strings"
)

func ParseSqlConnectionUri(connectionUri string) (string, string, error) {
	parsedUrl, err := url.Parse(connectionUri)
	if err != nil {
		return "", "", err
	}

	flavor := parsedUrl.Scheme
	switch flavor {
	case "sqlite":
		connectionDetails := connectionUri[len("sqlite://"):]
		return flavor, connectionDetails, nil
	case "postgres":
		detailsBuilder := strings.Builder{}
		host := parsedUrl.Host
		hostAndPort, port, err := net.SplitHostPort(host)
		if err == nil {
			host = strings.Split(hostAndPort, ":")[0]
			detailsBuilder.WriteString(fmt.Sprintf("port=%s ", port))
		} else {
			// Do nothing. No port was found
		}
		dbName := parsedUrl.Path[1:]
		detailsBuilder.WriteString(fmt.Sprintf("host=%s ", host))
		detailsBuilder.WriteString(fmt.Sprintf("dbname=%s ", dbName))
		if parsedUrl.User != nil {
			user := parsedUrl.User.Username()
			password, passwordIsSet := parsedUrl.User.Password()

			detailsBuilder.WriteString(fmt.Sprintf("user=%s ", user))
			if passwordIsSet {
				detailsBuilder.WriteString(fmt.Sprintf("password='%s' ", password))
			}
		}
		queryParams := parsedUrl.Query()
		for paramKey := range queryParams {
			detailsBuilder.WriteString(fmt.Sprintf("%s=%s ", paramKey, queryParams.Get(paramKey)))
		}
		connectionDetails := strings.TrimSpace(detailsBuilder.String())
		return flavor, connectionDetails, nil
	default:
		return "", "", fmt.Errorf("Unrecognized SQL flavor found while parsing connection string: %s", flavor)
	}
}

func main() {
	s := "postgres://user:pass@host.com:5432/path?k=v#f"
	flavor, detailsString, err := ParseSqlConnectionUri(s)
	if err != nil {
		panic(err)
	}
	fmt.Println(flavor, detailsString)
}
`}</CodeBlock>
      </CodeSnippet>
      <CodeSnippet title="Simple Unit Test">
        <p>
          This is what a basic unit test looks like in Go. It must exist in a
          file named with the form <code>*_test.go</code>, and the name of each
          test must follow the form <code>TestXxx</code> where the first letter
          after "Test" is capitalized. Execute <code>go test</code> in the
          terminal to run unit tests. A <code>t.Error(str)</code> is equivalent
          to a <code>t.Log(str)</code> followed by a <code>t.Fail()</code>.
        </p>
        <CodeBlock lang="go">{`
package mypackage

import "testing"

func TestSomething(t *testing.T) {
  t.Log("Testing something")
  if 1 != 2 {
    // or t.Errorf if you want C-style string format
    t.Error("We've got a problem here")
  }
}
`}</CodeBlock>
      </CodeSnippet>
    </CodeSnippetPost>
  )
}
