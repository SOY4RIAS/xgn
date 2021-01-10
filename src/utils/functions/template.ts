import fs from 'fs';
import path from 'path';
import * as template from 'ejs';

interface TemplateData {
  [key: string]: any;
}

interface Targets {
  targetDir: string;
  templatePath: string;
  projectName: string;
}

export function createDirectoryContents(
  { targetDir, templatePath, projectName }: Targets,
  data: TemplateData
) {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach((file) => {
    const origFilePath = path.join(templatePath, file);

    // get stats about the current file
    const stats = fs.statSync(origFilePath);

    if (['.template.json'].indexOf(file) > -1) {
      return;
    }

    if (stats.isFile()) {
      let contents = fs.readFileSync(origFilePath, 'utf8');

      contents = template.render(contents, data);

      const writePath = path.join(targetDir, projectName, file);
      fs.writeFileSync(writePath, contents, 'utf8');
    } else if (stats.isDirectory()) {
      fs.mkdirSync(path.join(targetDir, projectName, file));

      // recursive call
      createDirectoryContents(
        {
          targetDir,
          templatePath: path.join(templatePath, file),
          projectName: path.join(projectName, file)
        },
        data
      );
    }
  });
}
