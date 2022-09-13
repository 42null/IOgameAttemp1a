{ pkgs }: {
	deps = [
		pkgs.sudo
  pkgs.toybox
  pkgs.nodejs-16_x
        pkgs.nodePackages.typescript-language-server
        pkgs.nodePackages.yarn
        pkgs.replitPackages.jest
	];
}