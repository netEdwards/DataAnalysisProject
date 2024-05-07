rsync -avz --exclude 'node_modules' --exclude '.git' --exclude '.env' \ -e "ssh -i ~/atl-6103-desktop.pem" \ . ubuntu@ec2-54-145-221-187.compute-1.amazonaws.com:~/app


ssh -i "atl-6103-desktop.pem" ubuntu@ec2-54-145-221-187.compute-1.amazonaws.com