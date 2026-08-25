 const codeTemplates = {
  cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {

    // Write your solution here

    return 0;
}`,

  c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {

    // Write your solution here

    return 0;
}`,

  java: `import java.util.*;

public class Main {
    public static void main(String[] args) {

        // Write your solution here

    }
}`,

  python: `def main():

    # Write your solution here
    pass


if __name__ == "__main__":
    main()`,

  javascript: `function main() {

    // Write your solution here

}

main();`,

  typescript: `function main(): void {

    // Write your solution here

}

main();`,

  go: `package main

import "fmt"

func main() {

    // Write your solution here

}`,

  rust: `use std::io::{self, Read};

fn main() {

    // Write your solution here

}`
};
export default codeTemplates